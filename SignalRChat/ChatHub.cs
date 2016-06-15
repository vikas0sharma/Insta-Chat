using System;
using System.Web;
using Microsoft.AspNet.SignalR;
namespace SignalRChat
{
    public class ChatHub : Hub
    {
        public void Send(string name, string message,string id)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message,id);
        }
    }
}