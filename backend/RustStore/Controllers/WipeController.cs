using Domain.Response;
using Microsoft.AspNetCore.Mvc;

namespace RustStore.Controllers
{
    [Route("api/v1/wipe")]
    public class WipeController : Controller
    {
        private readonly Dictionary<int, DayOfWeek> serverWipeDays = new Dictionary<int, DayOfWeek>
        {
            { 1, DayOfWeek.Friday },
            { 2, DayOfWeek.Friday },
            { 3, DayOfWeek.Monday },
            { 4, DayOfWeek.Monday }
        };

        private DateTime firstGlobalWipeDate = new DateTime(DateTime.UtcNow.Year, 1, 1);

        [HttpGet]
        public IBaseServerResponse<object> GetWipeSchedule()
        {
            List<object> wipeSchedule = new List<object>();

            DateTime currentDate = DateTime.UtcNow.Date;

            // Calculate wipe schedule for the next month
            for (int i = 0; i < 30; i++) // assuming a month is 30 days for simplicity
            {
                var wipeDate = currentDate.AddDays(i);
                if (wipeDate.DayOfWeek == DayOfWeek.Monday || wipeDate.DayOfWeek == DayOfWeek.Friday)
                {
                    foreach (var kvp in serverWipeDays)
                    {
                        if (kvp.Value == wipeDate.DayOfWeek)
                        {
                            var serverId = kvp.Key;
                            var wipeType = CalculateWipeType(serverId, wipeDate);

                            wipeSchedule.Add(new
                            {
                                date = wipeDate,
                                serverId = serverId,
                                type = wipeType
                            });
                        }
                    }
                }
            }

            return new BaseServerResponse<object>(wipeSchedule,Domain.Enum.StatusCode.OK);
        }

        private string CalculateWipeType(int serverId, DateTime wipeDate)
        {
            DayOfWeek serverWipeDay = serverWipeDays[serverId];
            bool isGlobalWipe = (wipeDate.DayOfWeek == serverWipeDay) || (wipeDate.DayOfWeek == serverWipeDay - 3); // Checking if it's a global wipe day (Monday or Friday)

            if (isGlobalWipe)
            {
                int daysSinceFirstGlobalWipe = (wipeDate - firstGlobalWipeDate).Days;
                if (daysSinceFirstGlobalWipe >= 14)
                {
                    return "global";
                }
                else
                {
                    return "normal";
                }
            }
            else
            {
                return "normal";
            }
        }
    }
}
