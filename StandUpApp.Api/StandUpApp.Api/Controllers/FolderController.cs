using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using StandUpApp.Api.DAL;
using StandUpApp.Api.Services.Interfaces;
using StandUpApp.Api.ViewModels;

namespace StandUpApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FolderController : ControllerBase
    {
        private IFolderService _folderService;
        public FolderController(IFolderService folderService)
        {
            _folderService = folderService;
        }

        [HttpPost("[action]")]
        [EnableCors("Policy1")]
        public async Task<IActionResult> CreateFolder([FromBody] FolderViewModel folder)
        {
            return Ok(await _folderService.AddFolderToRoot(folder.FolderName));
        }
    }
}
