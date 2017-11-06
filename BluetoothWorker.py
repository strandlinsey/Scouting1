from bluetooth import *
import threading
import requests

server_sock = BluetoothSocket( RFCOMM )
server_sock.bind(("", PORT_ANY))
server_sock.listen(1)

port = server_sock.getsockname()[1]

# Unique UUID, Must Correspond w/ Tablets
uuid = "94f39d29-7d6d-437d-973b-fba39e49d4ee"

# Advertise Serial Port Profile
advertise_service( server_sock, "TGA Bluetooth Server",
                   service_id = uuid,
                   service_classes = [ uuid, SERIAL_PORT_CLASS ],
                   profiles = [ SERIAL_PORT_PROFILE ])

# Bluetooth Worker Thread
def bluetoothWorker(idx):
    # Thread Started
    print(" - Device {}: Waiting for connection on RFCOMM channel {}...".format(idx, port))

    # Attempt Connection
    client_sock, client_info = server_sock.accept()
    print(" - Device {}: Accepted connection from {}.".format(idx, client_info))

    while True:
        try:
            # Receive Data
            data = client_sock.recv(1024)
            newDataHandler(idx, client_info, data)
            
            # Send Data
            # client_sock.send(data)
        except IOError:
            # Connection Failed
            print(" - Device {}: Unable to connect...".format(idx))
            print(IOError)
            
            # Attempt Reconnection
            client_sock, client_info = server_sock.accept()
            print(" - Device {}: Accepted connection from {}.".format(idx, client_info))

    client_sock.close()
    server_sock.close()

# New Data from BT Worker Thread
def newDataHandler(idx, client_info, data):
    requests.post('http://127.0.0.1:4909/new_data', json={
        'idx': idx,
        'client_info': client_info,
        'data': data
    })
    
# Start Application
print('Press `Ctrl+Shift+\` to Exit')
print("Starting Threads...")
    
# Start Threads
threads = []
for i in range(6):
    t = threading.Thread(target=bluetoothWorker, args=(i,))
    threads.append(t)
    t.start()
    
print("Started Threads...")