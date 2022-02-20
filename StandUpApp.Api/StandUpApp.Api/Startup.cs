using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using StandUpApp.Api.DAL;
using StandUpApp.Api.Services.Classes;
using StandUpApp.Api.Services.Interfaces;

namespace StandUpApp.Api
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
            //services.AddDbContext<StandupContext>(options => options.UseSqlServer(Configuration.GetConnectionString("StandUpConnectionString")));
            //services.AddDbContext<StandupContext>(options => options.UseSqlServer(@"Server=tcp:15.188.231.120,1433;Initial Catalog=StandUp.Api;Persist Security Info=False;User ID=NCPAdmin;Password=fgDS67:54;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;"));
             services.AddDbContext<StandupContext>(options => options.UseSqlServer("Server=tcp:localhost,1433;Initial Catalog=StandUp;Persist Security Info=False;User ID=SA;Password=dockerTest226; "));
            services.AddCors(options =>
            {
                options.AddPolicy("Policy1",
                    builder =>
                    {
                        //builder.AllowAnyOrigin()
                        builder.WithOrigins("http://localhost:3000")
                        //.AllowAnyHeader()
                        .WithHeaders(HeaderNames.ContentType)
                        .WithMethods("GET", "POST", "PUT", "DELETE");
                    });

            });

            services.AddScoped<INotesService, NotesService>();
            services.AddScoped<IFolderService, FolderService>();
            //create Db context but use as dependency injection, because we have declared it as type <StandupContext>, we are using sql server 
            services.AddControllers();
            services.AddControllersWithViews().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("Policy1");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}
