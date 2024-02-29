using Domain.Enum;


namespace Domain.Entity
{
    public class BalanceActionModel
    {
        public DateTime DateTime { get; set; }
        public OperationType OperationType { get; set; }
        public string PaymentSystem {  get; set; }
    }
}
