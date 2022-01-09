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

        public async Task<List<NoteModel>> GetAllNotes()
        {
            var notes = await _context.Notes.Include(x => x.Labels).ToListAsync();
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
            
            foreach (var note in notes)
            {
                var folder = await _context.Folders.FirstOrDefaultAsync(x => x.Id == note.FolderId);
                if (note.FolderId == 1)
                {
                        childs.Add(new ChildViewModel
                        {
                            name = note.Name,
                            id = note.Id,
                            isfolder = false,
                            child = new List<ChildViewModel>()
                        });
                }
                else if (note.FolderId == folder.Id)
                {
                    var child = new ChildViewModel
                    {
                        name = folder.Name,
                        id = folder.Id,
                        isfolder = true,
                        child = new List<ChildViewModel>()
                    };
                    child.child.Add(new ChildViewModel
                    {
                        name = note.Name,
                        id = note.Id,
                        isfolder = false,
                        child = new List<ChildViewModel>()
                    });
                    childs.Add(child);
                }
                
            }
            var folders = _context.Folders.ToList();
            foreach (var folder in folders)
            {
                var result = await _context.Notes.FirstOrDefaultAsync(x => x.FolderId == folder.Id);
                if(result == null)
                {
                    childs.Add(new ChildViewModel
                    {
                        name = folder.Name,
                        id = folder.Id,
                        isfolder = true,
                        child = new List<ChildViewModel>()
                    });
                }
            }
            //var folders = _context.Folders.Where(x => !x.Notes.Select(y => y.FolderId).Contains(x.Id)).ToList();
            //var folders1 = _context.Folders.Where(x => x.Notes.Select(y => y.FolderId).FirstOrDefault() != x.Id).ToList();
            //foreach (var folder in _context.Folders)
            //{
            //    //foreach (var note in _context.Notes)
            //    {
            //        if(_context.Folders.FirstOrDefault(x => x.Id == note.FolderId) == null) {
            //            //if (folder.Id != note.FolderId)
            //            {
            //                var child = new ChildViewModel
            //                {
            //                    name = folder.Name,
            //                    id = folder.Id,
            //                    isfolder = true,
            //                    child = new List<ChildViewModel>()
            //                };
            //                childs.Add(child);
            //            }
            //        }
            //    }
            //}


            return new
            {
                name = "notes",
                id = 0,
                toggled = true,
                child = childs
            };
        }
    }
}


