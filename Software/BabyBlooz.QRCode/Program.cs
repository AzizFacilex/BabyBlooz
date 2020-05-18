using System;
using System.IO;
using QRCoder;
using System.Drawing.Imaging;
using Zen;
using Zen.Barcode;
using System.Drawing;

namespace BabyBlooz.QRCode
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Please Write your Lilypad code:");
            string acceptQRCode = Console.ReadLine();

            Console.WriteLine("Please give an API link :");
            string acceptApiCode = Console.ReadLine();
            string codeCombination = acceptApiCode + acceptQRCode;
            qrcode = BarcodeDrawFactory.CodeQr;
            var drawQRCode = qrcode.Draw(codeCombination, 40);
            Console.WriteLine("Please give a path to save QR :");
            string path = Console.ReadLine();
            if (path == null || path == string.Empty)
            {
                Console.WriteLine("Please give a path to save QR :");
            }
            else 
            {

                Console.WriteLine("What is your file name :");
                string Filename = Console.ReadLine();
                drawQRCode.Save(path);


            }



            // QRCodeGenerator qrGenerator = new QRCodeGenerator();
            // QRCodeGenerator.QRCode qrCode = qrGenerator.CreateQrCode(textBoxQRCode.Text, QRCodeGenerator.ECCLevel.Q);
            // pictureBoxQRCode.BackgroundImage = qrCode.GetGraphic(20);

            Console.ReadLine();

        }

    }
}
