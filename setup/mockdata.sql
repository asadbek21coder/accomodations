
 insert into state (
        name
    )
    values 
    ('Tashkent'),
    ('Samarkand'),
    ('Kokand'),
    ('Bukhara');

    insert into classified (
    holder_id,
    state_id,
    condition,
    image_url,
    monthly_price,
    max_students,
    room_count,
    address,
    additional_info
) values 
-- (
--     1,
--     1,
--     'yevroremont',
--     'thisisanimageurl',
--     200,
--     6,
--     2,
--     'Shayxontoxur tumani falon kocha falon uy',
--     'bollarga'
-- ),
(
    3,
    3,
    'ortacha',
    'thisisanimageurl',
    300,
    9,
    3,
    'Yunusobod tumani falon kocha falon uy',
    'bollar yoki qizlarga'
),
(
    5,
    1,
    'yaxshi',
    'thisisanimageurl',
    200,
    6,
    2,
    'Sergeli tumani falon kocha falon uy',
    'just an additional info'
),
(
    2,
    4,
    'qoniqarli',
    'thisisanimageurl',
    500,
    8,
    2,
    'Olmazor tumani falon kocha falon uy',
    'just an additional info'

),
(
    4,
    2,
    'yevroremont',
    'thisisanimageurl',
    300,
    4,
    2,
    'Bektermir tumani falon kocha falon uy',
    'just an additional info'

);