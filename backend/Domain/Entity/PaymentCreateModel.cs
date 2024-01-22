﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class PaymentCreateModel
    {
        public string PaymentServiceKey { get; set; }
        public decimal Amount { get; set; }
        public string SteamId { get; set; }
        public string SteamName { get; set;}
        public int OrderId { get; set; }
        public PaymentServiceModel? PaymentServiceModel { get; set; }
    }
}
