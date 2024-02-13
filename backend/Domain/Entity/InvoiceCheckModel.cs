
namespace Domain.Entity
{
    public class InvoiceCheckModel
    {
        public int OrderId { get; set; }
        public PaymentServiceModel? PaymentServiceModel { get; set; }
    }
}
