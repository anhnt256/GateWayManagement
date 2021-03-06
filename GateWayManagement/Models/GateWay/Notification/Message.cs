﻿using System;
using System.ComponentModel.DataAnnotations;

namespace GateWayManagement.Models.GateWay.Notification
{
    public class Message
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        [Required]
        public string Contents { get; set; }
        [Required]
        public string UserName { get; set; }
        public DateTimeOffset PostedAt { get; set; }
    }
}