using GateWayManagement.Models.CSM.ClientSys;
using GateWayManagement.Models.CSM.Service;
using GateWayManagement.Models.CSM.ServiceDetail;
using GateWayManagement.Models.CSM.User;
using GateWayManagement.Models.GateWay.Computer;
using GateWayManagement.Models.GateWay.Material;
using GateWayManagement.Models.GateWay.Order;
using GateWayManagement.Models.GateWay.User;
using GateWayManagement.Services.CSM;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GateWayManagement
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddCors(options => options.AddPolicy("CorsPolicy",
            builder =>
            {
                builder.AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowAnyOrigin()
                       .AllowCredentials();
            }));


            services.AddSignalR(o =>
            {
                o.EnableDetailedErrors = true;
            });
            services.AddTransient<IUserService>(x => new UserService(Configuration.GetConnectionString("Default")));
            services.AddTransient<IPaymentService>(x => new PaymentService(Configuration.GetConnectionString("Default")));
            services.AddTransient<IGateWayUserService>(x => new GateWayUserService(Configuration.GetConnectionString("GateWay")));
            services.AddTransient<IGateWayGameService>(x => new GateWayGameService(Configuration.GetConnectionString("GateWay")));
            services.AddTransient<IGateWayUserGameMapService>(x => new GateWayUserGameMapService(Configuration.GetConnectionString("GateWay")));
            services.AddTransient<IGateWayGameParamService>(x => new GateWayGameParamService(Configuration.GetConnectionString("GateWay")));
            services.AddTransient<IGateWayEventResult>(x => new GateWayEventResult(Configuration.GetConnectionString("GateWay")));


            services.Add(new ServiceDescriptor(typeof(ClientSysContext), new ClientSysContext(Configuration.GetConnectionString("Default"))));
            services.Add(new ServiceDescriptor(typeof(ServiceContext), new ServiceContext(Configuration.GetConnectionString("Test"))));
            services.Add(new ServiceDescriptor(typeof(ServiceDetailContext), new ServiceDetailContext(Configuration.GetConnectionString("Test"))));
            // Custom Database
            services.Add(new ServiceDescriptor(typeof(OrderContext), new OrderContext(Configuration.GetConnectionString("GateWay"))));
            services.Add(new ServiceDescriptor(typeof(MaterialContext), new MaterialContext(Configuration.GetConnectionString("GateWay"))));
            services.Add(new ServiceDescriptor(typeof(ComputerContext), new ComputerContext(Configuration.GetConnectionString("GateWay"))));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
