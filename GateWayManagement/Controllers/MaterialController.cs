using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using GateWayManagement.Models.GateWay.Material;
using GateWayManagement.Models;

namespace GateWayManagement.Controllers
{

    [Route("api/[controller]")]
    public class MaterialController : Controller
    {
        private IWebHostEnvironment _hostingEnvironment;
        int DEFAULT_STORE_ID = 1;

        public MaterialController(IWebHostEnvironment environment)
        {
            _hostingEnvironment = environment;
        }
        public IActionResult Index()
        {
            return View();
        }



        #region Ajax

        [HttpPost("[action]")]
        public IActionResult SetMaterial([FromBody]MaterialModel model)
        {
            MaterialContext materialContext = HttpContext.RequestServices.GetService(typeof(MaterialContext)) as MaterialContext;
            Material material = model.material;
            material.store_id = DEFAULT_STORE_ID;
            material.created_date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            material.is_active = 1;
            material.is_delete = 0;
            material.avatar = material.avatar.Replace("\\", "/");

            materialContext.SetMaterial(material);
            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = "1"
            });
        }

        [HttpPost("[action]")]
        public JsonResult GetMaterial([FromBody]Material material)
        {
            MaterialContext materialContext = HttpContext.RequestServices.GetService(typeof(MaterialContext)) as MaterialContext;
            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = materialContext.GetAll(material.store_id.ToString())
            });
        }

        [HttpPost("UploadFile")]
        public async Task<IActionResult> Post(IFormFile avatar)
        {
            string filePath = "";
            // full path to file in temp location
            if (avatar.Length > 0)
            {
                string dir = Path.Combine(_hostingEnvironment.ContentRootPath, "ClientApp/uploads/material");
                bool dirExists = Directory.Exists(dir);
                if (!dirExists)
                    Directory.CreateDirectory(dir);

                filePath = Path.Combine(dir, avatar.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
                {
                    await avatar.CopyToAsync(stream);
                }
            }

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { status = "done", url = filePath, thumbUrl = filePath });
        }

        #endregion
    }
}