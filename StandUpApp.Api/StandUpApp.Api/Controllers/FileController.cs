using System;
using Microsoft.AspNetCore.Mvc;
using StandUpApp.Api.DAL;
using StandUpApp.Api.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using System.IO;
using StandUpApp.Api.ViewModels;

namespace StandUpApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase //decalring the notes controller, of type controller
    {
        private readonly StandupContext _context;  //context for entity core, DB context is ORM goes ontop of the data layer
        public FileController(StandupContext context) //dependency injection from Startup.cs
        {
            _context = context; //create the context
        }

        //[HttpPost("[action]")]
        [HttpPost]
        //[EnableCors("Policy1")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Upload([FromForm]NoteViewModel model)
        {
            bool result = false;
            string filename = String.Empty;
            byte[] fileData = null;
            try
            {
                string extension = $".{model.File.FileName.Split('.')[model.File.FileName.Split('.').Length - 1]}";
                filename = DateTime.Now.Ticks.ToString() + extension;
                //string path = Path.Combine(Directory.GetCurrentDirectory(), "uploadedfiles\\files");

                //if (!Directory.Exists(path))
                //{
                //    Directory.CreateDirectory(path);
                //}

                string path = Path.Combine(Directory.GetCurrentDirectory(), "obj", model.FileName);

                using( Stream stream = new FileStream(path, FileMode.Create))
                {
                    //await model.File.CopyToAsync(stream);
                    //using (var memoryStream = new MemoryStream())
                    //{
                    //    await stream.CopyToAsync(memoryStream);
                    //    fileData = memoryStream.ToArray();
                    //}
                    model.File.CopyTo(stream);
                    //TODO: 1) upload file into database, 2) call it from the frontend
                    var note = await _context.Notes.Where(x => x.Id == model.NoteId).FirstOrDefaultAsync();
                    var image = new ImageModel();
                    image.CreatedBy = "System";
                    image.CreationDate = DateTime.Now;
                    image.Data = ReadFully(stream);
                    image.FileName = filename;
                    image.MimeType = "";
                    image.ModificationDate = DateTime.Now;
                    image.ModifiedBy = "System";
                    image.NoteModel = note;
                    image.NoteModelId = note.Id;
                    

                     _context.Images.Add(image);
                     _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

            return Ok();
        }



        [HttpGet]
        [EnableCors("Policy1")]
        public async Task<IActionResult> GetFiles()
        {
            return Ok("Hello these are the files");
        }

        [HttpDelete]
        [EnableCors("Policy1")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            try
            {
                var image = await _context.Images.FirstOrDefaultAsync(x => x.Id == id);
                _context.Images.Remove(image);
                _context.SaveChanges();
                if(image == null)
                {
                    return NoContent();
                }

            }
            catch (Exception ex)
            {
                throw new ArgumentException("Please enter the right arguments ", nameof(id), ex);
                return BadRequest();
            }

            return Ok();
        }



        private byte[] ReadFully(Stream input)
        {
            MemoryStream ms = new MemoryStream();
            input.Position = 0;
            input.CopyTo(ms);
            byte[] array = ms.ToArray();
            return array;
            
        }


    }
}