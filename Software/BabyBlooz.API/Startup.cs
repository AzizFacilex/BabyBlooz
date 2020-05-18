using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using BabyBlooz.API.Hubs;
using BabyBlooz.API.Services;
using AutoMapper;
using BabyBlooz.DB;
namespace BabyBlooz.API {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddSignalR ();
            services.AddCors ();
            services.AddDBServices();
            services.AddTransient<IHistoryService,HistoryService>();
            services.AddTransient<IDataService,DataService>();
            services.AddTransient<IIDService,IDService>();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMvc ().SetCompatibilityVersion (CompatibilityVersion.Version_2_2);


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            } else {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts ();
            }
            app.UseCors (options => options.AllowAnyHeader ().AllowAnyMethod ().AllowAnyOrigin ());
            app.UseSignalR ((options) => {
                options.MapHub<ValuesHub> ("/Hub/Values");

            });

            // app.UseHttpsRedirection ();
            app.UseMvc ();
        }
    }
}