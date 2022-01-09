using System;
using System.Collections.Generic;

namespace StandUpApp.Api.Models
{
    public class NoteModel : BaseHistory
    {
        public string Text { get; set; }
        public string Name { get; set; }
        public virtual List<LabelsModel> Labels { get; set; }
        public virtual List<ImageModel> Images { get; set; } //virtual for eager loading, 
        public string Author { get; set; }
        public int FolderId { get; set; }
        public FolderModel Folder { get; set; }

        public NoteModel()
        {
            Labels = new List<LabelsModel>();
            Images = new List<ImageModel>();
        }
    }
}
