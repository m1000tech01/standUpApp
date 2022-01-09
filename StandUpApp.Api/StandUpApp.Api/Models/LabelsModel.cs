using System;
namespace StandUpApp.Api.Models
{
    public class LabelsModel : BaseHistory
    {
        public string LabelText { get; set; }
        public int NoteModelId { get; set; }
        public virtual NoteModel NoteModel { get; set; }



    }
}
