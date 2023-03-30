// MainForm.cs

using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace TimeTracker
{
    public partial class MainForm : Form
    {
        [DllImport("user32.dll")]
        static extern bool GetLastInputInfo(ref LASTINPUTINFO plii);

        private const int IDLE_TIME_THRESHOLD = 300000; // 5 minutes in milliseconds

        private Timer timer;
        private int time;

        public MainForm()
        {
            InitializeComponent();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            timer = new Timer();
            timer.Interval = 1000;
            timer.Tick += new EventHandler(Timer_Tick);
            timer.Start();
        }

        private void MainForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            timer.Stop();
            timer.Dispose();
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            LASTINPUTINFO lastInputInfo = new LASTINPUTINFO();
            lastInputInfo.cbSize = (uint)Marshal.SizeOf(lastInputInfo);

            if (GetLastInputInfo(ref lastInputInfo))
            {
                uint idleTime = (uint)Environment.TickCount - lastInputInfo.dwTime;
                if (idleTime >= IDLE_TIME_THRESHOLD)
                {
                    time = 0;
                }
                else
                {
                    time++;
                }
                timeLabel.Text = "Time: " + time;
            }
        }
    }

    public struct LASTINPUTINFO
    {
        public uint cbSize;
        public uint dwTime;
    }
}
