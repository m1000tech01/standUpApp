using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StandUpApp.Api.DAL;
using StandUpApp.Api.Models;
using StandUpApp.Api.Services.Interfaces;
using StandUpApp.Api.ViewModels;

namespace StandUpApp.Api.Services.Classes
{
    public class NotesService : INotesService
    {
        private readonly StandupContext _context;
        public NotesService(StandupContext context)
        {
            _context = context;
        }

        public async Task<bool> DeleteNoteById(int id)
        {
            bool result = false;
            try
            {
                var record = await _context.Notes.FirstOrDefaultAsync(x => x.Id == id);
                var deleterecord = _context.Remove(record);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                _ = ex.Message;
            }
            return result;
        }

        public async Task<List<NoteModel>> GetAllNotes()
        {
            var notes = await _context.Notes.Include(x => x.Labels).Include(x => x.Images).ToListAsync();
            var folders = await _context.Folders.ToListAsync();
            if (folders.Count == 0)
            {
                _context.Folders.Add(new FolderModel
                {
                    Name = "Root",
                    CreationDate = DateTime.Now,
                    ModificationDate = DateTime.Now

                });
                _context.SaveChanges();
            }
            return notes;
        }

        public async Task<Object> GetNotesTreeView()
        {
            var notes = await GetAllNotes();
            var childs = new List<Object>();
            foreach (var note in notes)
            {
                childs.Add(new
                {
                    name = note.Name,
                    id = note.Id,
                    child = new List<Object>()
                });
            }


            return new
            {
                name = "notes",
                id = 0,
                toggled = true,
                child = childs
            };
        }

        public async Task<Object> GetNotesTreeViewWithFolders()
        {
            var notes = await GetAllNotes();
            var childs = new List<ChildViewModel>();

            var folders = _context.Folders.ToList();
            foreach (var folder in folders)
            {
                var notesperfolder = await _context.Notes.Where(x => x.FolderId == folder.Id).ToListAsync();

                var addedfolder =new ChildViewModel{
                            name = folder.Name,
                            id = folder.CreationDate.Ticks,
                            isfolder = true,
                            child = new List<ChildViewModel>()
                    };
                
                foreach (var note in notesperfolder)
                {
                    addedfolder.child.Add(new ChildViewModel
                    {
                        name = note.Name,
                        id = note.Id,
                        isfolder = false,
                        child = new List<ChildViewModel>()
                    });
                }
                if (notesperfolder.Count== 0) 
                addedfolder.child.Add(new ChildViewModel
                {
                    name="",
                    isfolder = false,
                    child = new List<ChildViewModel>()
                });
                childs.Add(addedfolder);
            }


            return new
            {
                name = "notes",
                id = 0,
                toggled = true,
                child = childs
            };
        }
    

    public async Task<Object> GetNotesTreeViewWithFoldersAndSubCat()
    {
        var notes = await GetAllNotes();
            var subCatergories = new List<TreeViewNoteModel>();

        var folders = _context.Folders.ToList();
        foreach (var folder in folders)
        {
            var notesperfolder = await _context.Notes.Where(x => x.FolderId == folder.Id).ToListAsync();

            var addedfolder = new TreeViewNoteModel
            {
                label = folder.Name,
                id = folder.CreationDate.Ticks,
                isfolder = true,
                subCatergories = new List<TreeViewNoteModel>()
            };

            foreach (var note in notesperfolder)
            {
                addedfolder.subCatergories.Add(new TreeViewNoteModel
                {
                    label = note.Name,
                    id = note.Id,
                    isfolder = false,
                    subCatergories = new List<TreeViewNoteModel>()
                });
            }
            if (notesperfolder.Count == 0)
                addedfolder.subCatergories.Add(new TreeViewNoteModel
                {
                    label = "",
                    isfolder = false,
                    subCatergories = new List<TreeViewNoteModel>()
                });
                subCatergories.Add(addedfolder);
        }


        return new TreeViewNoteModel()
        {
            label = "notes",
            id = 0,
            isfolder = false,
            subCatergories = subCatergories
        };
    }
}
}


