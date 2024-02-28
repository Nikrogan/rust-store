using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Drawing.Drawing2D;
using System.Drawing;
using System.Net;
using System.Web.UI.DataVisualization.Charting;
using System.Drawing.Imaging;
using GrapeCity.Documents.Imaging;
using System.Diagnostics;
using SharpCompress.Common;
using System.Net.Http.Headers;

namespace RustStore.Controllers
{
    [Route("api/v1/test")]
    [ApiController]
    public class Test : Controller
    {
        [HttpPost]
        public IActionResult GenerateRadarChart([FromBody] Dictionary<string, int> data)
        {
            // Создаем новый объект Radar Chart
            var chart = new Chart();
            chart.Width = 600;
            chart.Height = 400;
            chart.BackColor = System.Drawing.Color.HotPink;


            // Добавляем серию данных
            var series = new Series();
            series.ChartType = SeriesChartType.Radar;

            foreach (var kvp in data)
            {
                series.Points.AddXY(kvp.Key, kvp.Value);
            }

            chart.Series.Add(series);

            // Создаем изображение Radar Chart
            MemoryStream imageStream = new MemoryStream();
            chart.SaveImage(imageStream, ChartImageFormat.Png);
            byte[] imageBytes = imageStream.ToArray();
            imageStream.Close();

            // Возвращаем изображение в виде файла
            return File(imageBytes, "image/png");
        }

        [HttpGet("avatar")]
        public async Task<IActionResult> GenerateCircularImage(string imageUrl)
        {
            try
            {
                Stopwatch stopwatch = new Stopwatch();
                stopwatch.Start();

                var httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("image/jpeg"));


                var responseImage = await httpClient.GetAsync(imageUrl);
                byte[] imageData = await responseImage.Content.ReadAsByteArrayAsync();


                string maskUrl = "mask.png";
                byte[] maskData;
                using (var fileStream = new FileStream(maskUrl, FileMode.Open, FileAccess.Read))
                {
                    maskData = new byte[fileStream.Length];
                    await fileStream.ReadAsync(maskData, 0, (int)fileStream.Length);
                }
                //var responseMask = await httpClient.GetAsync(maskUrl);
                //byte[] maskData = await responseMask.Content.ReadAsByteArrayAsync();

                GcBitmap maskk = new GcBitmap(maskData);
                GcBitmap bmp = new GcBitmap(imageData);

                GrayscaleBitmap grayscaleMask = maskk.ToGrayscaleBitmap(ColorChannel.Blue, true);

                bmp.ApplyTransparencyMask(grayscaleMask);

                using (MemoryStream resultStream = new MemoryStream())
                {
                    bmp.SaveAsPng(resultStream);
                    byte[] resultImageData = resultStream.ToArray();

                    stopwatch.Stop();
                    Console.WriteLine($"Время выполнения: {stopwatch.ElapsedMilliseconds} мс");

                    return File(resultImageData, "image/png");
                }



            }
            catch (Exception ex)
            {
                return BadRequest($"Ошибка при обработке изображения: {ex.Message}");
            }
        }
    }
}

