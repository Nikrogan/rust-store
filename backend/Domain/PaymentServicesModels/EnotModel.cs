using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PaymentServicesModels
{
    public class EnotModel
    {
        public float Amount { get; set; }
        public string Order_id { get; set; }
        //public string Signature { get; set; }
        public string Shop_id { get; set; }
        public string Hook_url { get; set; }
        public string? Fail_url { get; set; }
        public string? Success_url { get; set; }

        //  Время жизни инвойса
        public int Expire { get; set; }
        public string Custom_fields { get; set; }
        public string Comment { get; set; }

        // Методы оплаты доступные на странице счёта
        public List<string>? Include_service { get; set; }

        // Методы оплаты доступные на странице счёта
        public List<string>? Exclude_service { get; set; }

    }
}
