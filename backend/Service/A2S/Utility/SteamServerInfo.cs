using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace RestoreMonarchy.ServersStatusBot.Helpers
{
    public class SteamServerInfo
    {
        private IPEndPoint _endPoint;
        private UdpClient _client;
        public byte Header { get; set; }
        public byte Protocol { get; set; }
        public string Name { get; set; }
        public string Map { get; set; }
        public string Folder { get; set; }
        public string Game { get; set; }
        public short ID { get; set; }
        public byte Players { get; set; }
        public byte MaxPlayers { get; set; }
        public byte Bots { get; set; }
        public ServerTypeFlags ServerType { get; set; }
        public EnvironmentFlags Environment { get; set; }
        public VisibilityFlags Visibility { get; set; }
        public VACFlags VAC { get; set; }
        public string Version { get; set; }
        public ExtraDataFlags ExtraDataFlag { get; set; }

        #region Extra Data Flag Members
        public ulong GameID { get; set; }
        public ulong SteamID { get; set; }
        public string Keywords { get; set; }
        public short Port { get; set; }
        #endregion

        #region Custom Data
        public string IP { get; set; }
        public bool Online = true;
        #endregion

        public SteamServerInfo(string address)
        {
            _endPoint = GetIPEndPoint(address);

            using (_client = new UdpClient())
            {
                _client.Client.SendTimeout = (int)500;
                _client.Client.ReceiveTimeout = (int)500;
                _client.Connect(_endPoint);

                Refresh();
            }

            _client = null;
        }

        public void Refresh()
        {
            _client.Send(REQUEST, REQUEST.Length);
            byte[] response = null;
            try
            {
                response = _client.Receive(ref _endPoint);
            } catch
            {
                Online = false;
                return;
            }
            
            using (BinaryReader br = new BinaryReader(new MemoryStream(response)))
            {
                IP = _endPoint.Address.ToString();
                Header = br.ReadByte();
                Protocol = br.ReadByte();
                Name = br.ReadAnsiString().Substring(4);
                Map = br.ReadAnsiString();
                Folder = br.ReadAnsiString();
                Game = br.ReadAnsiString();
                ID = br.ReadInt16();
                Players = br.ReadByte();
                MaxPlayers = br.ReadByte();
                Bots = br.ReadByte();
                ServerType = (ServerTypeFlags)br.ReadByte();
                Environment = (EnvironmentFlags)br.ReadByte();
                Visibility = (VisibilityFlags)br.ReadByte();
                VAC = (VACFlags)br.ReadByte();
                Version = br.ReadAnsiString();
                ExtraDataFlag = (ExtraDataFlags)br.ReadByte();
                if (ExtraDataFlag.HasFlag(ExtraDataFlags.Port))
                    Port = br.ReadInt16();
                if (ExtraDataFlag.HasFlag(ExtraDataFlags.SteamID))
                    SteamID = br.ReadUInt64();
                if (ExtraDataFlag.HasFlag(ExtraDataFlags.Keywords))
                    Keywords = br.ReadAnsiString();
                if (ExtraDataFlag.HasFlag(ExtraDataFlags.GameID))
                    GameID = br.ReadUInt64();
            }
        }


        public IPEndPoint GetIPEndPoint(string address)
        {
            string[] ep = address.Split(':');
            if (ep.Length != 2) throw new FormatException("Invalid endpoint format");
            IPAddress ip = Dns.GetHostAddresses(ep[0])[0];
            if (ip == null)
            {
                throw new FormatException("Invalid ip-adress");
            }
            int port;
            if (!int.TryParse(ep[1], NumberStyles.None, NumberFormatInfo.CurrentInfo, out port))
            {
                throw new FormatException("Invalid port");
            }

            IPEndPoint endPoint = new IPEndPoint(ip, port + 1);
            return endPoint;
        }


        public static readonly byte[] REQUEST = new byte[] { 0xFF, 0xFF, 0xFF, 0xFF, 0x54, 0x53, 0x6F, 0x75, 0x72, 0x63, 0x65, 0x20, 0x45, 0x6E, 0x67, 0x69, 0x6E, 0x65, 0x20, 0x51, 0x75, 0x65, 0x72, 0x79, 0x00 };
      
        #region Strong Typing Enumerators
        [Flags]
        public enum ExtraDataFlags : byte
        {
            GameID = 0x01,
            SteamID = 0x10,
            Keywords = 0x20,
            Spectator = 0x40,
            Port = 0x80
        }
        public enum VACFlags : byte
        {
            Unsecured = 0,
            Secured = 1
        }
        public enum VisibilityFlags : byte
        {
            Public = 0,
            Private = 1
        }
        public enum EnvironmentFlags : byte
        {
            Linux = 0x6C,   //l
            Windows = 0x77, //w
            Mac = 0x6D,     //m
            MacOsX = 0x6F   //o
        }
        public enum ServerTypeFlags : byte
        {
            Dedicated = 0x64,     //d
            Nondedicated = 0x6C,   //l
            SourceTV = 0x70   //p
        }
        #endregion
    }
}