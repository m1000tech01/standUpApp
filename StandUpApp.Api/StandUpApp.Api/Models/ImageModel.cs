using System;
namespace StandUpApp.Api.Models
{
    public class ImageModel : BaseHistory
    {
        public string MimeType { get; set; }
        public string FileName { get; set; }
        public byte[] Data { get; set; }
        public int NoteModelId { get; set; }
        public virtual NoteModel NoteModel { get; set; } //use virtual here as an example of eager loading 
    }
}
