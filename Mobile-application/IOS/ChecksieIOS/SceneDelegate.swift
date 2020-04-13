//
//  SceneDelegate.swift
//  Covid19
//
//  Created by Phiset Khankhang on 8/4/2563 BE.
//  Copyright © 2563 CMKL-CIE Covid. All rights reserved.
//

import UIKit
import SwiftUI
import CoreBluetooth
import CoreLocation
class SceneDelegate: UIResponder, UIWindowSceneDelegate , CBCentralManagerDelegate, CLLocationManagerDelegate{
    var window: UIWindow?
    let locationManager = CLLocationManager()
    private var centralManager : CBCentralManager!
    public func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
        print("\nName   : \(peripheral.name ?? "(No name)")")
        print("RSSI   : \(RSSI)")
        for ad in advertisementData {
            print("AD Data: \(ad)")
        }
    }
    func startAdvertising(_ advertisementData: [String : Any]?){
    }
    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        if central.state == .poweredOn {
            print("Bluetooth is On")
            centralManager.scanForPeripherals(withServices: [CBUUID(string: "0000180F-0000-1000-8000-00805F9B34FB")], options: nil)
        } else {
            print("Bluetooth is not active")
        }
    }
    
    @IBAction func getLocation(_ sender: Any) {
        // 1
        let status = CLLocationManager.authorizationStatus()

        switch status {
            // 1
        case .notDetermined:
                locationManager.requestWhenInUseAuthorization()
                return

            // 2
        case .denied, .restricted:
            Alert(title: Text("Location Services disabled"), message: Text("Please enable Location Services in Settings"), dismissButton: .default(Text("OK")))
            return
        case .authorizedAlways, .authorizedWhenInUse:
            break


        }
        // 4
        locationManager.delegate = self
        locationManager.startUpdatingLocation()
    }
    // 1
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let currentLocation = locations.last {
            print("Current location: \(currentLocation)")
        }
    }

    // 2
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print(error)
    }


    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        // Use this method to optionally configure and attach the UIWindow `window` to the provided UIWindowScene `scene`.
        // If using a storyboard, the `window` property will automatically be initialized and attached to the scene.
        // This delegate does not imply the connecting scene or session are new (see `application:configurationForConnectingSceneSession` instead).

        centralManager = CBCentralManager(delegate: self, queue: nil, options: nil)
        // Create the SwiftUI view that provides the window contents.
        let contentView = ContentView()

        // Use a UIHostingController as window root view controller.
        if let windowScene = scene as? UIWindowScene {
            let window = UIWindow(windowScene: windowScene)
            window.rootViewController = UIHostingController(rootView: contentView)
            self.window = window
            window.makeKeyAndVisible()
        }
    }

    func sceneDidDisconnect(_ scene: UIScene) {
        // Called as the scene is being released by the system.
        // This occurs shortly after the scene enters the background, or when its session is discarded.
        // Release any resources associated with this scene that can be re-created the next time the scene connects.
        // The scene may re-connect later, as its session was not neccessarily discarded (see `application:didDiscardSceneSessions` instead).
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        // Called when the scene has moved from an inactive state to an active state.
        // Use this method to restart any tasks that were paused (or not yet started) when the scene was inactive.
    }

    func sceneWillResignActive(_ scene: UIScene) {
        // Called when the scene will move from an active state to an inactive state.
        // This may occur due to temporary interruptions (ex. an incoming phone call).
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        print("entering foreground.")
        // Called as the scene transitions from the background to the foreground.
        // Use this method to undo the changes made on entering the background.
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        print("entered background.")
        // Called as the scene transitions from the foreground to the background.
        // Use this method to save data, release shared resources, and store enough scene-specific state information
        // to restore the scene back to its current state.
    }


}

