FORMAT: 1A
HOST: https://motor666.herokuapp.com/

# motor666

* add "userToken" field to every request headers.
* all password need to be converted to md5 first before being sent to server.
* client app can use 'kumangkumeng' as token. to posts stuffs, you need admin's token.
* uses MongoDB for database.

## Auth [/user/auth]
obtaining admin's token.

### Admin Login [GET]

+ Request (application/json)
    + Body

            {
                "username" : "admin",
                "password" : ""
            }

+ Response 200 (application/json)
    + Body

            {
              "status_code": 200,
              "message": "",
              "data": {
                "user": {
                  "_id": "57583b1adcba0f052b388711",
                  "username": "admin",
                  "password": null,
                  "role": 1
                },
                "token": ""
              }
            }


## Bikes [/bike?category]
### Get bikes by category name [GET]

+ Parameters
    + category (string) - the bike category name you want to find, NOT the category id.

+ Request (application/json)

    + Header

            userToken : sometoken

+ Response 200 (application/json)
    + Body

            {
              "status_code": 200,
              "message": "",
              "data": [
                {
                  "_id": "575a41dbf58bb1a9075636ba",
                  "name": "Motor batur",
                  "desc": "testing aja coy, selo.",
                  "colour": [
                    {
                      "name": "black",
                      "hex": "000000",
                      "images": [
                        "imgs-1465532344608.png",
                        "imgs-1465532344613.png"
                      ]
                    }
                  ],
                  "categories": [
                    "Black Bike",
                    "Old Bike"
                  ],
                  "features": "- Roda 2\n- Tangki depan\n- Gas puter\n- Ban bulet",
                  "specs": "- 2 Tak\n- 500cc\n",
                  "service_info": "- Pake oli yang mahal yah\n- sebulan sekali",
                  "accessories": []
                },
                {
                  "_id": "575c1cc698f068ad0bf7c508",
                  "name": "Bike mcBikey #2",
                  "desc": "testing aja coy, selo.",
                  "colour": [
                    {
                      "name": "black",
                      "hex": "000000",
                      "images": [
                        "imgs-1465532344608.png",
                        "imgs-1465532344613.png"
                      ]
                    }
                  ],
                  "categories": [
                    "Black Bike",
                    "Old Bike"
                  ],
                  "features": "- Roda 2\n- Tangki depan\n- Gas puter\n- Ban bulet",
                  "specs": "- 2 Tak\n- 500cc\n",
                  "service_info": "- Pake oli yang mahal yah\n- sebulan sekali",
                  "accessories": []
                }
              ]
            }

## Single Bike [/bike/{bike_id}]
### Get a bike's detail [GET]

+ Parameters
    + bike_id (string) - the bike's id. duh.

+ Request (application/json)

    + Header

            userToken : sometoken

+ Response 200 (application/json)
    + Body

            {
              "status_code": 200,
              "message": "",
              "data": {
                "_id": "575a41dbf58bb1a9075636ba",
                "name": "Motor batur",
                "desc": "testing aja coy, selo.",
                "colour": [
                  {
                    "name": "black",
                    "hex": "000000",
                    "images": [
                      "imgs-1465532344608.png",
                      "imgs-1465532344613.png"
                    ]
                  }
                ],
                "categories": [
                  "Black Bike",
                  "Old Bike"
                ],
                "features": "- Roda 2\n- Tangki depan\n- Gas puter\n- Ban bulet",
                "specs": "- 2 Tak\n- 500cc\n",
                "service_info": "- Pake oli yang mahal yah\n- sebulan sekali",
                "accessories": []
              }
            }


## Add Bike [/bike]
### Create New Bike [POST]

Take an object of Bike to be added to DB.
+ Request (application/json)
    + Header

            userToken : sometoken
    + Body

            {
                "name" : "Bike mcBikey #2",
                "desc" : "testing aja coy, selo.",
                "colour" : [
                        {
                            "name" : "black",
                            "hex" : "000000",
                            "images" : [
                                "imgs-1465532344608.png",
                                "imgs-1465532344613.png"
                                ]
                        }
                    ],
                "categories" : [
                        "Black Bike",
                        "Old Bike"
                    ],
                "features" : "- Roda 2\n- Tangki depan\n- Gas puter\n- Ban bulet",
                "specs" : "- 2 Tak\n- 500cc\n",
                "service_info" : "- Pake oli yang mahal yah\n- sebulan sekali",
                "accessories" : []
            }

+ Response 200 (application/json)
    + Body

            {
              "status_code": 200,
              "message": "",
              "data": {
                "name": "Hell Rider",
                "desc": "testing aja coy, selo.",
                "colour": [
                  {
                    "name": "black",
                    "hex": "000000",
                    "images": [
                      "imgs-1465532344613.png",
                      "imgs-1465532344608.png"
                    ]
                  }
                ],
                "categories": [
                  "Old Bike"
                ],
                "features": "- Roda 2\n- Tangki depan\n- Gas puter\n- Ban bulet",
                "specs": "- 2 Tak\n- 500cc\n",
                "service_info": "- Pake oli yang mahal yah\n- sebulan sekali",
                "accessories": [],
                "_id": "575ce65808f35a8319b05cf6"
              }
            }

## Categories [/category]
### Get All Categories [GET]

+ Request (application/json)
    + Header

            userToken : sometoken

+ Response 200 (application/json)

    + Body

            {
            "status_code": 200,
            "message": "",
            "data": [
                {
                  "_id": "575a3e55f58bb1a9075636b5",
                  "name": "Black Bike",
                  "image": "imgs-1465531928206.png",
                  "parent": ""
                },
                {
                  "_id": "575a40aaf58bb1a9075636b9",
                  "name": "Old Bike",
                  "image": "imgs-1465532510415.png",
                  "parent": ""
                },
                {
                  "_id": "575c216479f0f8080cd235c2",
                  "name": "White Bikes",
                  "image": "imgs-1465532510415.png",
                  "parent": ""
                }
              ]
            }

### Post New Category [POST]

+ Request (application/json)

    + Header

            userToken : sometoken

    + Body

            {
              "name": "Ugly bikes",
              "image": "imgs-1465532510415.png",
              "parent": ""
            }

+ Response 200 (application/json)

    + Body

            {
              "status_code": 200,
              "message": "",
              "data": {
                "name": "White Bikes",
                "image": "imgs-1465532510415.png",
                "parent": "",
                "_id": "575ce85f08f35a8319b05cf7"
              }
            }

## Banners [/banners]

### Get All Banners [GET]

+ Request (application/json)
    + Header

            userToken : sometoken

+ Response 200 (application/json)

    + Body

            {
              "status_code": 200,
              "message": "",
              "data": [
                {
                  "_id": "575c0bc244a198a50aa09358",
                  "name": "Banner #1",
                  "desc": "Lorem ipsum dolor yada yada yada",
                  "image": "imgs-1465532344608.png",
                  "type": "bike",
                  "related_id": "575a41dbf58bb1a9075636ba"
                },
                {
                  "_id": "575c0be344a198a50aa09359",
                  "name": "Banner #1",
                  "desc": "Lorem ipsum dolor yada yada yada",
                  "image": "imgs-1465532344608.png",
                  "type": "category",
                  "related_id": "575a3e55f58bb1a9075636b5"
                }
              ]
            }

### Post New Banner [POST]

+ Request (application/json)
    + Header

            userToken : sometoken

    + Body

            {
                "name" : "Banner #3",
                "desc": "Lorem ipsum dolor yada yada yada",
                "image": "imgs-1465532344608.png",
                "type" : "category",
                "related_id" : "575a3e55f58bb1a9075636b5"
            }

+ Response 200 (application/json)
    + Body

            {
              "status_code": 200,
              "message": "",
              "data": {
                "name": "Banner #3",
                "desc": "Lorem ipsum dolor yada yada yada",
                "image": "imgs-1465532344608.png",
                "type": "category",
                "related_id": "575a3e55f58bb1a9075636b5",
                "_id": "575ce9a208f35a8319b05cf8"
              }
            }

## News [/news]

### Get all News [GET]

+ Request (application/json)
    + Header

            userToken : sometoken

+ Response 200 (application/json)
    + Body

            {
              "status_code": 200,
              "message": "",
              "data": [
                {
                  "_id": "575d03e821a14c091c3616e4",
                  "title": "Some news #1",
                  "short_content": "Lorem ipsum yada yada yada.",
                  "date": 1465713517
                }
              ]
            }

### Add new News [POST]
+ Request (application/json)
    + Header

            userToken : sometoken

    + Body

            {
                "title" : "Some news #1",
                "short_content" : "Lorem ipsum yada yada yada.",
                "full_content" : "Lorem ipsum yada yada yada. Lorem ipsum yada yada yada. Lorem ipsum yada yada yada. Lorem ipsum yada yada yada. Lorem ipsum yada yada yada.",
                "date" : 1465713517
            }

+ Response 200 (application/json)
    + Body

            {
              "status_code": 200,
              "message": "",
              "data": {
                "title": "Some news #2",
                "short_content": "Lorem ipsum yada yada yada.",
                "full_content": "Lorem ipsum yada yada yada. Lorem ipsum yada yada yada. Lorem ipsum yada yada yada. Lorem ipsum yada yada yada. Lorem ipsum yada yada yada.",
                "date": 1465713519,
                "_id": "575d08c6bfae611100956392"
              }
            }

## Single News [/news/{news_id}]
+ Parameters
    + news_id (string) - the news id

### Get a News Detail [GET]
+ Request (application/json)
    + Header

            userToken : sometoken

+ Response 200 (application/json)
    + Body

            {
              "status_code": 200,
              "message": "",
              "data": {
                "title": "Some news #2",
                "short_content": "Lorem ipsum yada yada yada.",
                "full_content": "Lorem ipsum yada yada yada. Lorem ipsum yada yada yada. Lorem ipsum yada yada yada. Lorem ipsum yada yada yada. Lorem ipsum yada yada yada.",
                "date": 1465713519,
                "_id": "575d08c6bfae611100956392"
              }
            }

## Events [/events]
### Get all events [GET]
+ Request (application/json)
    + Header

            userToken : sometoken

+ Response 200 (application/json)
    + Body

            {
              "status_code": 200,
              "message": "",
              "data": [
                {
                  "_id": "575d05a66d61062d1c78db17",
                  "title": "Some event #1",
                  "desc": "Lorem ipsum yada yada yada.",
                  "date": 1465713517,
                  "valid_date": 1465862400,
                  "latitude": -6.945732,
                  "longitude": 107.6426
                },
                {
                  "_id": "575d05fd6d61062d1c78db18",
                  "title": "Some event #2",
                  "desc": "Di jakarta",
                  "date": 1465713517,
                  "valid_date": 1465862400,
                  "latitude": -6.258023,
                  "longitude": 106.833737
                }
              ]
            }

### Add new Event [POST]
+ Request (application/json)
    + Header

            userToken : sometoken

    + Body

            {
                "title" : "Some event #2",
                "desc" : "Di jakarta",
                "date" : 1465713517,
                "valid_date" : 1465862400,
                "latitude" : -6.258029,
                "longitude" : 106.833731
            }

+ Response 200 (application/json)
    + Body

            {
              "status_code": 200,
              "message": "",
              "data": {
                "title": "Some event #2",
                "desc": "Di jakarta",
                "date": 1465713517,
                "valid_date": 1465862400,
                "latitude": -6.258023,
                "longitude": 106.833737,
                "_id": "575d05fd6d61062d1c78db18"
              }
            }

## Nearby Events [/events/nearby?latitude={latitude}&longitude={longitude}&max={max}]
+ Parameters
    + latitude (double) - latitude.
    + longitude (double) - longitude.
    + max (integer) - max find area in meters.

### Get Nearby Events [GET]

+ Request (application/json)
    + Header

            userToken : sometoken

+ Response 200 (application/json)
    + Body

            {
              "status_code": 200,
              "message": "",
              "data": [
                {
                  "_id": "575d05a66d61062d1c78db17",
                  "title": "Some event #1",
                  "desc": "Lorem ipsum yada yada yada.",
                  "date": 1465713517,
                  "valid_date": 1465862400,
                  "latitude": -6.945732,
                  "longitude": 107.6426
                }
              ]
            }

## Images [/images]

### Post Images [POST]

+ Request (multipart/form-data; boundary=---BOUNDARY)

        -----BOUNDARY
        Content-Disposition: form-data; name="imgs[file]"; filename="image.jpg"
        Content-Type: image/jpeg
        Content-Transfer-Encoding: base64

        /9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a
        HBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy
        MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIA
        AhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEB
        AAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AD//Z
        -----BOUNDARY

+ Response 200 (application/json)

    + Body

            {
              "status_code": 200,
              "message": "",
              "data": [
                {
                  "name": "imgs-1465710378652.png",
                  "_id": "575cf72aa03226731a4573af"
                }
              ]
            }

### Get all images [GET]

+ Request (application/json)
    + Header

            userToken : sometoken

+ Response 200 (application/json)

    + Body

            {
              "status_code": 200,
              "message": "",
              "data": [
                {
                  "_id": "5758f6bac4df322e91042af0",
                  "name": "imgs-1465448122767.png"
                },
                {
                  "_id": "5758f73db18fa23091ff3179",
                  "name": "imgs-1465448253561.png"
                },
                {
                  "_id": "5758f77cf8f4ef38910f0bc1",
                  "name": "imgs-1465448316355.png"
                },
                {
                  "_id": "5758f77cf8f4ef38910f0bc2",
                  "name": "imgs-1465448316363.png"
                },
                {
                  "_id": "5758f7b4aae5da5f91f00593",
                  "name": "imgs-1465448372698.png"
                },
                {
                  "_id": "5758f7b4aae5da5f91f00594",
                  "name": "imgs-1465448372702.png"
                },
                {
                  "_id": "575a3e18f58bb1a9075636b4",
                  "name": "imgs-1465531928206.png"
                },
                {
                  "_id": "575a3fb8f58bb1a9075636b6",
                  "name": "imgs-1465532344608.png"
                },
                {
                  "_id": "575a3fb8f58bb1a9075636b7",
                  "name": "imgs-1465532344613.png"
                },
                {
                  "_id": "575a405ef58bb1a9075636b8",
                  "name": "imgs-1465532510415.png"
                },
                {
                  "_id": "575cf6e012b50f491a47bd90",
                  "name": "imgs-1465710304931.png"
                },
                {
                  "_id": "575cf72aa03226731a4573af",
                  "name": "imgs-1465710378652.png"
                }
              ]
            }

## Get single image [/image/{image_name}]

+ Parameters
    + image_name (string) - the name of the image.

### Get the image file by name [GET]

+ Request (application/json)
    + Header

            userToken : sometoken

+ Response 200 (file)

        the image file
