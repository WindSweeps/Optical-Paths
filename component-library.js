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
        "yMm": 130,
        "rotationDeg": -135
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
          "widthMm": 10.2,
          "heightMm": 30.5
        },
        "clamp": {
          "slot": {
            "startXmm": 27,
            "startYmm": 0,
            "endXmm": 59,
            "endYmm": 0
          },
          "defaultRotationDeg": -15,
          "widthMm": 18,
          "forkOuterDiameterMm": 32.8,
          "forkClearanceDiameterMm": 25,
          "endLengthMm": 13
        },
        "post": {
          "centerXmm": 0,
          "centerYmm": 0,
          "diameterMm": 25
        }
      },
      "optics": {
        "behavior": "transmit",
        "surface": {
          "startXmm": 0,
          "startYmm": 12.7,
          "endXmm": 0,
          "endYmm": -12.7
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
      "id": "waveplate1inch",
      "name": "一英寸波片架",
      "type": "modulator",
      "typeLabel": "偏振元件",
      "visualKind": "waveplate",
      "defaultPlacement": {
        "xMm": 105,
        "yMm": 120,
        "rotationDeg": 0
      },
      "geometry": {
        "body": {
          "widthMm": 12.7,
          "heightMm": 54
        },
        "post": {
          "centerXmm": -1.6,
          "centerYmm": 0,
          "diameterMm": 25
        },
        "clamp": {
          "widthMm": 18,
          "forkOuterDiameterMm": 32.8,
          "forkClearanceDiameterMm": 25,
          "endLengthMm": 13,
          "slot": {
            "startXmm": 27,
            "startYmm": 0,
            "endXmm": 59,
            "endYmm": 0
          },
          "defaultRotationDeg": 22
        }
      },
      "optics": {
        "behavior": "transmit",
        "wavelengthNm": 650,
        "sourcePort": {
          "xMm": 23,
          "yMm": 0
        },
        "surface": {
          "startXmm": 0,
          "startYmm": 11.5,
          "endXmm": 0,
          "endYmm": -11.5
        },
        "outputWavelengthNm": 532
      }
    },
    {
      "id": "beamsplitter-cube-1inch",
      "name": "一英寸分束立方",
      "type": "beamsplitter",
      "typeLabel": "分束元件",
      "visualKind": "beamsplitter",
      "defaultPlacement": {
        "xMm": 105,
        "yMm": 120,
        "rotationDeg": 0
      },
      "geometry": {
        "body": {
          "widthMm": 25.4,
          "heightMm": 25.4
        },
        "post": {
          "centerXmm": 0,
          "centerYmm": 0,
          "diameterMm": 25
        },
        "clamp": {
          "widthMm": 18,
          "forkOuterDiameterMm": 32.8,
          "forkClearanceDiameterMm": 25,
          "endLengthMm": 13,
          "slot": {
            "startXmm": 27,
            "startYmm": 0,
            "endXmm": 59,
            "endYmm": 0
          },
          "defaultRotationDeg": 22
        }
      },
      "optics": {
        "behavior": "split",
        "wavelengthNm": 650,
        "sourcePort": {
          "xMm": 23,
          "yMm": 0
        },
        "surface": {
          "startXmm": -12.7,
          "startYmm": -12.7,
          "endXmm": 12.7,
          "endYmm": 12.7
        },
        "outputWavelengthNm": 532
      }
    }
  ]
};
