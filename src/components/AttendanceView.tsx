
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Search, Download } from "lucide-react";

const AttendanceView = () => {
  const [dateFilter, setDateFilter] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock attendance data
  const attendanceData = [
    { id: 1, name: "Alice Johnson", rfid: "RF001", role: "Student", date: "2024-01-15", loginTime: "08:30", logoutTime: "16:45", status: "complete" },
    { id: 2, name: "Bob Smith", rfid: "RF002", role: "Teacher", date: "2024-01-15", loginTime: "07:45", logoutTime: "17:30", status: "complete" },
    { id: 3, name: "Carol Davis", rfid: "RF003", role: "Student", date: "2024-01-15", loginTime: "09:15", logoutTime: "-", status: "incomplete" },
    { id: 4, name: "David Wilson", rfid: "RF004", role: "Staff", date: "2024-01-15", loginTime: "08:00", logoutTime: "17:00", status: "complete" },
    { id: 5, name: "Emma Brown", rfid: "RF005", role: "Student", date: "2024-01-14", loginTime: "08:45", logoutTime: "16:30", status: "complete" },
    { id: 6, name: "Frank Miller", rfid: "RF006", role: "Student", date: "2024-01-14", loginTime: "09:00", logoutTime: "15:45", status: "complete" },
  ];

  const users = ["Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson", "Emma Brown", "Frank Miller"];

  const filteredData = attendanceData.filter(record => {
    const matchesDate = !dateFilter || record.date === dateFilter;
    const matchesUser = userFilter === "all" || record.name === userFilter;
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.rfid.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesUser && matchesSearch;
  });

  const calculateDuration = (login: string, logout: string) => {
    if (!logout || logout === "-") return "-";
    
    const loginTime = new Date(`2024-01-01 ${login}`);
    const logoutTime = new Date(`2024-01-01 ${logout}`);
    const diffMs = logoutTime.getTime() - loginTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}h ${diffMinutes}m`;
  };

  const getStatusBadge = (status) => {
    return (
      <Badge 
        variant={status === "complete" ? "default" : "destructive"}
        className={status === "complete" 
          ? "bg-green-500 hover:bg-green-600 text-white" 
          : "bg-orange-500 hover:bg-orange-600 text-white"
        }
      >
        {status === "complete" ? "Complete" : "In Progress"}
      </Badge>
    );
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Student": return "bg-blue-500";
      case "Teacher": return "bg-green-500";
      case "Staff": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Attendance Records</span>
            </span>
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name or RFID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full"
            />
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user} value={user}>{user}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid gap-4">
                {filteredData.map((record) => (
                  <div key={record.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {record.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{record.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={`${getRoleBadgeColor(record.role)} text-white text-xs`}>
                              {record.role}
                            </Badge>
                            <span className="text-xs text-gray-500">RFID: {record.rfid}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{record.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-green-500" />
                          <span className="text-gray-600">In: {record.loginTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-red-500" />
                          <span className="text-gray-600">Out: {record.logoutTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-600">Duration: {calculateDuration(record.loginTime, record.logoutTime)}</span>
                        </div>
                        <div className="flex justify-end">
                          {getStatusBadge(record.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No attendance records found for the selected filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceView;
