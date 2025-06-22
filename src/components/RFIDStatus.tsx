
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radio, Wifi, WifiOff, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const RFIDStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastScanned, setLastScanned] = useState({
    rfid: "RF001",
    name: "Alice Johnson",
    action: "login",
    time: new Date().toLocaleTimeString(),
    status: "success"
  });
  
  const [blinkGreen, setBlinkGreen] = useState(false);
  const [blinkRed, setBlinkRed] = useState(false);

  // Simulate RFID scanner activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random RFID scans
      const actions = ["login", "logout", "already_logged"];
      const users = [
        { rfid: "RF001", name: "Alice Johnson" },
        { rfid: "RF002", name: "Bob Smith" },
        { rfid: "RF003", name: "Carol Davis" },
        { rfid: "RF004", name: "David Wilson" },
      ];
      
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      setLastScanned({
        rfid: randomUser.rfid,
        name: randomUser.name,
        action: randomAction,
        time: new Date().toLocaleTimeString(),
        status: randomAction === "already_logged" ? "warning" : "success"
      });

      // Trigger LED animations
      if (randomAction === "login") {
        setBlinkGreen(true);
        setTimeout(() => setBlinkGreen(false), 1000);
      } else if (randomAction === "logout") {
        setBlinkRed(true);
        setTimeout(() => setBlinkRed(false), 1000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate connection status changes
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      setIsConnected(prev => Math.random() > 0.1 ? true : !prev);
    }, 10000);

    return () => clearInterval(connectionInterval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  const getStatusMessage = (action, status) => {
    if (status === "warning" && action === "already_logged") {
      return "Already Logged In";
    }
    switch (action) {
      case "login":
        return "Login Success";
      case "logout":
        return "Logout Success";
      default:
        return "Action Completed";
    }
  };

  const getActionBadgeColor = (action, status) => {
    if (status === "warning") {
      return "bg-orange-500 hover:bg-orange-600 text-white";
    }
    switch (action) {
      case "login":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "logout":
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RFID Reader Status */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Radio className="h-5 w-5 text-blue-600" />
              <span>RFID Reader Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Connection Status:</span>
              <div className="flex items-center space-x-2">
                {isConnected ? (
                  <>
                    <Wifi className="h-5 w-5 text-green-600" />
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">Connected</Badge>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-5 w-5 text-red-600" />
                    <Badge className="bg-red-500 hover:bg-red-600 text-white">Disconnected</Badge>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Reader ID:</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">RFID-001</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Heartbeat:</span>
              <span className="text-sm text-gray-500">{new Date().toLocaleTimeString()}</span>
            </div>

            {/* LED Indicators */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <div 
                  className={`w-16 h-16 mx-auto rounded-full border-4 border-green-200 flex items-center justify-center transition-all duration-300 ${
                    blinkGreen ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-pulse' : 'bg-green-100'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${blinkGreen ? 'bg-green-200' : 'bg-green-300'}`}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Login LED</p>
              </div>
              
              <div className="text-center">
                <div 
                  className={`w-16 h-16 mx-auto rounded-full border-4 border-red-200 flex items-center justify-center transition-all duration-300 ${
                    blinkRed ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse' : 'bg-red-100'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${blinkRed ? 'bg-red-200' : 'bg-red-300'}`}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Logout LED</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latest Scan Activity */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Latest Scan Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(lastScanned.status)}
                  <span className="font-semibold text-lg">
                    {getStatusMessage(lastScanned.action, lastScanned.status)}
                  </span>
                </div>
                <Badge className={getActionBadgeColor(lastScanned.action, lastScanned.status)}>
                  {lastScanned.action.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">User:</span>
                  <span className="font-medium">{lastScanned.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">RFID Tag:</span>
                  <span className="font-mono text-sm bg-white px-2 py-1 rounded border">{lastScanned.rfid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="text-sm">{lastScanned.time}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Waiting for next scan...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scan History */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Radio className="h-5 w-5 text-blue-600" />
            <span>Recent Scan History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => {
              const actions = ["login", "logout", "already_logged"];
              const users = ["Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson"];
              const randomAction = actions[index % actions.length];
              const randomUser = users[index % users.length];
              const time = new Date(Date.now() - (index + 1) * 60000).toLocaleTimeString();
              
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                      {randomUser.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{randomUser}</p>
                      <p className="text-sm text-gray-500">RF00{index + 1}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getActionBadgeColor(randomAction, randomAction === "already_logged" ? "warning" : "success")}>
                      {randomAction.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-gray-600">{time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RFIDStatus;
