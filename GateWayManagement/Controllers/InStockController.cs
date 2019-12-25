using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using GateWayManagement.Models;
using GateWayManagement.Models.GateWay.InStock;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GateWayManagement.Controllers
{
    [Route("api/[controller]")]
    public class InStockController : Controller
    {
        private IWebHostEnvironment _hostingEnvironment;
        int DEFAULT_STORE_ID = 1;
        public InStockController(IWebHostEnvironment environment)
        {
            _hostingEnvironment = environment;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("[action]")]
        public IActionResult SetInStock([FromBody]InStockModel model)
        {
            InStockContext instockContext = HttpContext.RequestServices.GetService(typeof(InStockContext)) as InStockContext;
            InStock instock = model.instock;
            instock.store_id = DEFAULT_STORE_ID;
            instock.created_date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            instock.is_active = 1;
            instock.is_delete = 0;
            instock.invoice = instock.invoice.Replace("\\", "/");

            instockContext.SetInStock(instock);

            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = "1"
            });
        }
        [HttpPost("[action]")]
        public JsonResult GetInStock([FromBody]InStock instock)
        {
            InStockContext instockContext = HttpContext.RequestServices.GetService(typeof(InStockContext)) as InStockContext;
            return Json(new ResponseModel()
            {
                ResponseCode = ResponseCode.Success,
                Reply = instockContext.GetAll(instock.store_id.ToString())
            });
        }

        [HttpPost("UploadFile")]
        public async Task<IActionResult> Post(IFormFile invoice)
        {
            string filePath = "";
            // full path to file in temp location
            if (invoice.Length > 0)
            {
                string dir = Path.Combine(_hostingEnvironment.ContentRootPath, "ClientApp/uploads/instock");
                bool dirExists = Directory.Exists(dir);
                if (!dirExists)
                    Directory.CreateDirectory(dir);

                filePath = Path.Combine(dir, invoice.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
                {
                    await invoice.CopyToAsync(stream);
                }
            }

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { status = "done", url = filePath, thumbUrl = filePath });
        }

    }
}