using System;
using Microsoft.AspNetCore.Http;

namespace StandUpApp.Api.ViewModels
{
    public class NoteViewModel
    {
        public int NoteId { get; set; }
        public string FileName { get; set; }
        public IFormFile File { get; set; }

    }
}
