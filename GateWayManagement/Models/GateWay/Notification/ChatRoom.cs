using System;
using System.ComponentModel.DataAnnotations;

namespace GateWayManagement.Models.GateWay.Notification
{
    public class ChatRoom
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}