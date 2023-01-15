using System;
using System.Collections.Generic;

namespace StandUpApp.Api.ViewModels
{
    public class TreeViewNoteModel
    {
        
        public long id { get; set; }
        public string label { get; set; }
        public bool isfolder { get; set; }
        public List<TreeViewNoteModel> subCatergories { get; set; }
    }
}


