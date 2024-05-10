using Domain.Enum;


namespace Domain.Entity
{
    public class BalanceActionModel
    {
        public DateTime DateTime { get; set; }
        public OperationType OperationType { get; set; }
        public string PaymentName {  get; set; }
        public decimal Value { get; set; }
    }
}
