using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using StandUpApp.Api.Models;

namespace StandUpApp.Api.ViewModels
{
    public class NoteViewModel
    {
        public int NoteId { get; set; }
        public string FileName { get; set; }
        public IFormFile File { get; set; }

    }

    public class AddOrUpdateNoteViewModel:BaseHistoryViewModel
    {
        public string Text { get; set; }
        public string Name { get; set; }
        public virtual List<LabelsModel> Labels { get; set; }
        public virtual List<ImageModel> Images { get; set; } //virtual for eager loading, 
        public string Author { get; set; }
        public Int64 FolderId { get; set; }
        public FolderModel Folder { get; set; }

    }
}
