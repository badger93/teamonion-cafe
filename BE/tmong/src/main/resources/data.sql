INSERT INTO MEMBER (id, member_id, member_role, password, point) VALUES (1, 'onion', 'ADMIN', '123456789a', 10000);
INSERT INTO MEMBER (id, member_id, member_role, password, point) VALUES (2, 'onion2', 'NORMAL', '123456789a', 3000);
INSERT INTO MEMBER (id, member_id, member_role, password, point) VALUES (3, 'onion3', 'NORMAL', '123456789a', 99999999);

INSERT INTO MENU (id, image_path, information, name, price) VALUES (1, 'image_path_test', 'information_test', 'americano', 1000);
INSERT INTO MENU (id, image_path, information, name, price) VALUES (2, 'image_path_test', 'information_test', 'choco', 1500);
INSERT INTO MENU (id, image_path, information, name, price) VALUES (3, 'image_path_test', 'information_test', 'measiltee', 1000);
INSERT INTO MENU (id, image_path, information, name, price) VALUES (4, 'image_path_test', 'information_test', 'orangejuice', 1000);

INSERT INTO ORDERS (id, amount, buyer_id, created_date, made, paid, payment_type, pickup) VALUES (1, 2500, 1, '2019-07-24T16:39:31.434', false, true, 'POINT', false);
INSERT INTO ORDERS (id, amount, buyer_id, created_date, made, paid, payment_type, pickup) VALUES (2, 2000, 2, '2019-07-24T17:48:22.123', false, false, 'CASH', false);

INSERT INTO ORDERS_MENU_LIST (orders_id, menu_list_id) VALUES (1, 1);
INSERT INTO ORDERS_MENU_LIST (orders_id, menu_list_id) VALUES (1, 2);
INSERT INTO ORDERS_MENU_LIST (orders_id, menu_list_id) VALUES (2, 1);
INSERT INTO ORDERS_MENU_LIST (orders_id, menu_list_id) VALUES (2, 4);