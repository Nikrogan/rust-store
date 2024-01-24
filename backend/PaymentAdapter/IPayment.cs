using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentAdapter
{
    public interface IPayment
    {
        string ProcessPayment(InvoiceCreateModel invoiceCreateModel);
    }
}
