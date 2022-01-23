using System;
using Microsoft.AspNetCore.Mvc;
using StandUpApp.Api.DAL;
using StandUpApp.Api.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using StandUpApp.Api.Services.Interfaces;

namespace StandUpApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : Controller
    {
        private readonly StandupContext _context;
        private readonly INotesService _notesService;
        public NotesController(StandupContext context, INotesService notesService)
        {
            _context = context;
            _notesService = notesService;
        }


        [HttpGet("[action]")]
        [EnableCors("Policy1")]
        public async Task<IActionResult> GetNotes()
        {
            return Ok(await _notesService.GetAllNotes());
        }

        [HttpGet("[action]")]
        [EnableCors("Policy1")]
        public async Task<IActionResult> GetNotesTreeView()
        {
            //return Ok(await _notesService.GetNotesTreeView());
            return Ok(await _notesService.GetNotesTreeViewWithFolders());
        }


        [HttpGet("[action]/{Id}")]
        [EnableCors("Policy1")]
        public async Task<IActionResult> GetId(int Id)
        {
            var notes = await _context.Notes.Include(x => x.Labels).Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == Id);
            return Ok(notes);
        }




        [HttpPost("[action]")]
        [EnableCors("Policy1")]
        public async Task<IActionResult> AddNote([FromBody] NoteModel note)
        {
            note.CreationDate = DateTime.Now;
            note.ModificationDate = DateTime.Now;
            var result = await _context.Notes.AddAsync(note);
            await _context.SaveChangesAsync();
            return Ok(result);
        }

        [HttpPut("[action]")]
        [EnableCors("Policy1")]
        public async Task<IActionResult> UpdateNote([FromBody] NoteModel note)
        {

            if (note != null)
            {
                if (note.Id == 0)
                {
                    note.CreationDate = DateTime.Now;
                    note.ModificationDate = DateTime.Now;
                    note.CreatedBy = "System";
                    note.ModifiedBy = "System";
                    note.Name = DateTime.Now.Ticks.ToString();
                    await _context.Notes.AddAsync(note);
                    await _context.SaveChangesAsync();
                    return Ok(note);
                }
                else
                {
                    var images = _context.Images.Where(x => x.NoteModelId == note.Id).ToList();
                    var labels = _context.Labels.Where(x => x.NoteModelId == note.Id).ToList();
                    var noteFromDb = _context.Notes.Include(x => x.Labels).FirstOrDefault(x => x.Id == note.Id);

                    noteFromDb.Images = note.Images != null ? note.Images.Select(x => new ImageModel
                    {
                        CreatedBy = x.CreatedBy,
                        CreationDate = x.CreationDate,
                        FileName = x.FileName,
                        Id = x.Id,
                        MimeType = x.MimeType,
                        ModificationDate = x.ModificationDate,
                        ModifiedBy = x.ModifiedBy,
                        NoteModelId = x.NoteModelId,
                        Data = x.Data
                    }).ToList() : images;

                    noteFromDb.Author = note.Author != null ? note.Author : noteFromDb.Author;
                    noteFromDb.Name = note.Name != null ? note.Name : noteFromDb.Name;
                    noteFromDb.ModificationDate = DateTime.Now;
                    noteFromDb.ModifiedBy = note.ModifiedBy != null ? note.ModifiedBy : noteFromDb.ModifiedBy;


                    noteFromDb.Labels = note.Labels != null ? note.Labels.Select(x => new LabelsModel
                    {
                        CreatedBy = x.CreatedBy,
                        CreationDate = x.CreationDate,
                        Id = x.Id,
                        ModificationDate = x.ModificationDate,
                        ModifiedBy = x.ModifiedBy,
                        NoteModelId = x.NoteModelId,
                        LabelText = x.LabelText
                    }).ToList() : labels;


                    _context.Update<NoteModel>(noteFromDb);
                    await _context.SaveChangesAsync();
                }
            }

            return Ok("returns put");
        }

        [HttpPut("[action]")]
        [EnableCors("Policy1")]
        public async Task<IActionResult> UpdateSingleNote([FromBody] NoteModel note)
        {

            if (note != null)
            {

                var noteFromDb = _context.Notes.FirstOrDefault(x => x.Id == note.Id);

                noteFromDb.Author = note.Author != null ? note.Author : noteFromDb.Author;
                noteFromDb.Name = note.Name != null ? note.Name : noteFromDb.Name;
                noteFromDb.ModificationDate = DateTime.Now;
                noteFromDb.ModifiedBy = note.ModifiedBy != null ? note.ModifiedBy : noteFromDb.ModifiedBy;

                _context.Update<NoteModel>(noteFromDb);
                await _context.SaveChangesAsync();
            }

            return Ok("returns put");
        }

        [HttpPut("[action]/{id}")]
        [EnableCors("Policy1")]
        public async Task<IActionResult> AddOrUpdate([FromBody] NoteModel note, int id)
        {

            if (note != null)
            {
                var noteFromDb = _context.Notes.FirstOrDefault(x => x.Id == id);
                if (noteFromDb != null)
                {
                    noteFromDb.Author = note.Author != null ? note.Author : noteFromDb.Author;
                    noteFromDb.Name = note.Name != null ? note.Name : noteFromDb.Name;
                    noteFromDb.ModificationDate = DateTime.Now;
                    noteFromDb.ModifiedBy = note.ModifiedBy != null ? note.ModifiedBy : noteFromDb.ModifiedBy;
                    noteFromDb.Text = note.Text;
                    _context.Update<NoteModel>(noteFromDb);
                    await _context.SaveChangesAsync();
                    return Ok(noteFromDb.Id);
                }
                else
                {
                    var folder = note.Folder != null ? await _context.Folders.FirstOrDefaultAsync(x => x.Name.ToLower() == note.Folder.Name.ToLower()) : await _context.Folders.FirstOrDefaultAsync(x => x.ParentID == null);
                    note.Name = DateTime.Now.Ticks.ToString();
                    note.CreationDate = DateTime.Now;
                    note.FolderId = folder.Id;
                    var newnote = await _context.Notes.AddAsync(note);
                    await _context.SaveChangesAsync();

                    return Ok(newnote.Entity.Id);
                }
            }

            return Ok();
        }


        [HttpDelete("[action]")]
        [EnableCors("Policy1")]
        public async Task<IActionResult> DeleteNote(int Id)
        {
            if (Id > 0)
            {
                var note = _context.Notes.FirstOrDefault(x => x.Id == Id);
                _context.Notes.Remove(note);
                await _context.SaveChangesAsync();
                return Ok(true);
            }
            return Ok(false);
        }


    }
}
