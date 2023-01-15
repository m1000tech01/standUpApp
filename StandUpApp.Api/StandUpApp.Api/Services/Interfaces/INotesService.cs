using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StandUpApp.Api.Models;
using StandUpApp.Api.ViewModels;

namespace StandUpApp.Api.Services.Interfaces
{
    public interface INotesService
    {
        Task<Object> GetNotesTreeView();
        Task<List<NoteModel>> GetAllNotes();
        Task<Object> GetNotesTreeViewWithFolders();
        Task<bool> DeleteNoteById(int id);
        Task<Object> GetNotesTreeViewWithFoldersAndSubCat();

    }
}
