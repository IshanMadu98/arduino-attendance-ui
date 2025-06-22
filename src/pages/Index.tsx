
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Activity, UserPlus } from "lucide-react";
import UserManagement from "@/components/UserManagement";
import AttendanceView from "@/components/AttendanceView";
import RFIDStatus from "@/components/RFIDStatus";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for dashboard
  const dashboardStats = {
    totalUsers: 145,
    todayLogins: 98,
    todayLogouts: 87,
    currentlyInside: 11
  };

  const recentActivities = [
    { id: 1, name: "Alice Johnson", rfid: "RF001", action: "login", time: "09:15 AM", role: "Student" },
    { id: 2, name: "Bob Smith", rfid: "RF002", action: "logout", time: "09:10 AM", role: "Teacher" },
    { id: 3, name: "Carol Davis", rfid: "RF003", action: "login", time: "09:05 AM", role: "Student" },
    { id: 4, name: "David Wilson", rfid: "RF004", action: "login", time: "09:00 AM", role: "Staff" },
    { id: 5, name: "Emma Brown", rfid: "RF005", action: "logout", time: "08:55 AM", role: "Student" },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{dashboardStats.totalUsers}</div>
            <p className="text-xs text-blue-600">Registered in system</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Today's Logins</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{dashboardStats.todayLogins}</div>
            <p className="text-xs text-green-600">People checked in</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Today's Logouts</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">{dashboardStats.todayLogouts}</div>
            <p className="text-xs text-red-600">People checked out</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Currently Inside</CardTitle>
            <UserPlus className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">{dashboardStats.currentlyInside}</div>
            <p className="text-xs text-purple-600">Active attendees</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Recent Attendance Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {activity.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-500">RFID: {activity.rfid} • {activity.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={activity.action === "login" ? "default" : "destructive"}
                    className={activity.action === "login" 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-red-500 hover:bg-red-600 text-white"
                    }
                  >
                    {activity.action.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-600 font-medium">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />;
      case "attendance":
        return <AttendanceView />;
      case "rfid":
        return <RFIDStatus />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            RFID Attendance Management System
          </h1>
          <p className="text-gray-600">
            Welcome to your modern attendance tracking dashboard
          </p>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
