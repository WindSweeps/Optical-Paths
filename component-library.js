window.OPTICAL_COMPONENT_LIBRARY = {
  "schemaVersion": 1,
  "components": [
    {
      "id": "laser-source",
      "name": "超稳镜架光线耦合头",
      "type": "source",
      "typeLabel": "光源",
      "visualKind": "source",
      "defaultPlacement": {
        "xMm": 70,
        "yMm": 150,
        "rotationDeg": 0
      },
      "geometry": {
        "body": {
          "widthMm": 40,
          "heightMm": 49.3
        },
        "clamp": {
          "slot": {
            "startXmm": 27,
            "startYmm": 0,
            "endXmm": 59,
            "endYmm": 0
          },
          "defaultRotationDeg": 22,
          "widthMm": 18,
          "forkOuterDiameterMm": 32.8,
          "forkClearanceDiameterMm": 25,
          "endLengthMm": 13
        },
        "post": {
          "centerXmm": 2.6,
          "centerYmm": 0,
          "diameterMm": 25
        }
      },
      "optics": {
        "behavior": "source",
        "wavelengthNm": 650,
        "sourcePort": {
          "xMm": 20,
          "yMm": 0
        },
        "surface": {
          "startXmm": -13,
          "startYmm": 10,
          "endXmm": 13,
          "endYmm": -10
        },
        "outputWavelengthNm": 532
      }
    },
    {
      "id": "mirror-mount",
      "name": "超稳镜架1英寸反射镜",
      "type": "reflector",
      "typeLabel": "反射元件",
      "visualKind": "mirror",
      "defaultPlacement": {
        "xMm": 105,
        "yMm": 120,
        "rotationDeg": 0
      },
      "geometry": {
        "body": {
          "widthMm": 40,
          "heightMm": 49.3
        },
        "clamp": {
          "slot": {
            "startXmm": 27,
            "startYmm": 0,
            "endXmm": 59,
            "endYmm": 0
          },
          "defaultRotationDeg": 22,
          "widthMm": 18,
          "forkOuterDiameterMm": 32.8,
          "forkClearanceDiameterMm": 25,
          "endLengthMm": 13
        },
        "post": {
          "centerXmm": 2.6,
          "centerYmm": 0,
          "diameterMm": 25
        }
      },
      "optics": {
        "behavior": "reflect",
        "surface": {
          "startXmm": 20,
          "startYmm": 12.5,
          "endXmm": 20,
          "endYmm": -12.5
        },
        "wavelengthNm": 650,
        "sourcePort": {
          "xMm": 23,
          "yMm": 0
        },
        "outputWavelengthNm": 532
      }
    },
    {
      "id": "lens-mount",
      "name": "透镜架",
      "type": "transmissive",
      "typeLabel": "透射元件",
      "visualKind": "lens",
      "defaultPlacement": {
        "xMm": 105,
        "yMm": 120,
        "rotationDeg": 0
      },
      "geometry": {
        "body": {
          "widthMm": 34,
          "heightMm": 54
        },
        "clamp": {
          "slot": {
            "startXmm": 16,
            "startYmm": 0,
            "endXmm": 72,
            "endYmm": 0
          },
          "defaultRotationDeg": -15,
          "widthMm": 28,
          "forkOuterDiameterMm": 53.4,
          "forkClearanceDiameterMm": 24,
          "endLengthMm": 14
        },
        "post": {
          "centerXmm": 10,
          "centerYmm": 9,
          "diameterMm": 20
        }
      },
      "optics": {
        "behavior": "transmit",
        "surface": {
          "startXmm": 0,
          "startYmm": -21,
          "endXmm": 0,
          "endYmm": 21
        },
        "wavelengthNm": 650,
        "sourcePort": {
          "xMm": 23,
          "yMm": 0
        },
        "outputWavelengthNm": 532
      }
    }
  ]
};
