//
//  ContentView.swift
//  Covid19
//
//  Created by Phiset Khankhang on 8/4/2563 BE.
//  Copyright © 2563 CMKL-CIE Covid. All rights reserved.
//

import SwiftUI
struct ContentView: View {
    let sceneDelegate = SceneDelegate()
    @State var selected = ""
    @State var show = false
    var body: some View {
        ZStack{
        VStack {
            MapView()
                .edgesIgnoringSafeArea(.top)
                .frame(height: 300)
            CircleImage()
                .offset(y:-130)
                .padding(.bottom,-130)
            
            VStack {
                Button(action:{
                    self.sceneDelegate.getLocation("button")
                    print("Get")
                    
                }){Text("GetLocation" ).font(.largeTitle)}
            }.padding()
            
            VStack(alignment: .leading) {
                
                Text("How do you feel today?").font(.title)
                HStack {
                    Text("Joshua Tree National Park")
                        .font(.subheadline)
                    Text("California")
                        .font(.subheadline)
                }
                HStack() {
                    VStack{
                        Text("Yes").font(.callout)
                        Button(action: {self.show.toggle()}){Circle().stroke(Color( self.show ? .green:.blue), lineWidth: 4).frame(width: 25, height: 25)}
                    }
                    .aspectRatio(contentMode: /*@START_MENU_TOKEN@*/.fill/*@END_MENU_TOKEN@*/)
                    
                    Spacer()
                    VStack{
                        Text("No").font(.callout)
                        Button(action: {if(self.show){self.show.toggle()}}){Circle().stroke(Color(self.show ? .blue:.green), lineWidth: 4).frame(width: 25, height: 25)}
                    }.aspectRatio(contentMode: /*@START_MENU_TOKEN@*/.fill/*@END_MENU_TOKEN@*/)
                    
                }.padding()
                VStack{
                    
                    RadioButtons(selected: self.$selected,show: self.$show).offset(y: self.show ? (UIApplication.shared.windows.last?.safeAreaInsets.bottom)!+15 : UIScreen.main.bounds.height)
                    
                    
                }
                
                
                
                
            }
                
            .padding()
            
            }
            
        }
        .background(Color(UIColor.label.withAlphaComponent(self.show ? 0.2 : 0)).edgesIgnoringSafeArea(.all))
        .animation(.default)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}



