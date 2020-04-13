//
//  CircleImage.swift
//  Covid19
//
//  Created by Phiset Khankhang on 9/4/2563 BE.
//  Copyright © 2563 CMKL-CIE Covid. All rights reserved.
//

import SwiftUI

struct CircleImage: View {
    var body: some View {
        Image("harem")
            .resizable()
            .clipShape(Circle())
            .overlay(
                Circle().stroke(Color.white,lineWidth: 4))
            .shadow(radius: 10)
            .scaledToFit()
    }
}

struct CircleImage_Previews: PreviewProvider {
    static var previews: some View {
        CircleImage()
    }
}
