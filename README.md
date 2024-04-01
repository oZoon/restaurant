# Приложение для заказа еды с доставкой

## Задача/цель
**Создать мобильное приложение либо веб-сайт для заказа еды с доставкой с поддержкой мультиязычности**

## Особенности
- использование Firebase Realtime Database
- использование React Router V5 для роутинга страниц
- использование Zustand в качестве стейт менеджера
- поддержка мультиязычности с помощью i18next
- styled-components для красоты )

## Установка и запуск в разных режимах
```
git clone https://github.com/oZoon/restaurant.git
cd restaurant
npm i
npm run start - development режим
npm run build - production режим 
```

## Настройка проекта перед запуском
- зарегистрироваться и войти https://firebase.google.com/
- перейти в консоль (правый верхний угол экрана, Go to console), создать новый проект
- в проекте, в левом меню найти Authentication, выбрать вкладку Sign-in method и добавить провайдера Email/Password, 
- в левом меню найти Realtime Database, создать базу данных
- в левом меню, напротив Project Overview кликнуть на шестеренку, выбрать Project settings, добавить приложение (Add app), при добавлении выбрать платформу web, при необходимости редактировать, скопировать значения полей firebaseConfig в файл проекта .env согласно названий полей
- предварительно загрузить в список меню в бд, пример структуры в файле menu-example.json, чтобы загрузить меню надо перейти в Realtime Database и в первой вкладке Data кликнуть на троеточие и выбрать import JSON и выбрать файл меню с локального компьютера

## Визуальная структура проекта

- главная страница, на ней регистрация или авторизация пользователя

- страница регистрации

- страница авторизации

- страница меню, отображается по 20 элементов из списка меню, при прокрутке до низа страницы подгружаются очередные 20 элементов из списка меню, каждый продут можно добавить в корзину, действие односторонее, чтобы убрать продукт из корзины необходимо перейти в корзину, см. описание соответствующей страницы

- страница корзины, отображаются все продукты, добавленные из меню, по умолчанию они все выбраны (галочка слева вкл), на странице корзины можно увеличивать/уменьшать количество каждого продукта, удалить продукт, отметить/снять галку для переноса выбранного товара и его количества в заказ, очистить всю корзину, выбрать все продукты/снять отметку со всех продуктов, также, внизу отображается сумма всех выбранных продуктов с учетом их количества, в самом низу кнопка перейти к заказу - переносит выбранные товары в черновик заказа, выбранные товары удаляются из корзины

- страница заказов, отображаются все заказы со всеми статусами за исключением отмененных заказов, каждый заказ можно свернуть/развернуть, для дальнейшего оформления заказ необходимо заполнить два поля - способ оплаты и адрес доставки, после заполнения кнопка оформить заказ становится активной,  при оформлении закза меняется статус, который на этом шаге зависит от выбора способа оплаты, на любом статусе (черновик, заказ оформлен, заказ оплачен, заказ в сборке и т.д.) заказ можно отменить/удалить

- проект выполнен с учетом кроссбраузерности, адаптивности и мультиязычности (добавен один язык - русский)

## Технологии/фреймворки/библиотеки
- [React](https://ru.react.js.org/) - React
- [Firebase](https://firebase.google.com/) - Firebase
- [Zustand](https://docs.pmnd.rs/zustand) - Zustand
- [i18next](https://www.i18next.com/) - i18next

## Демо
[Демо](https://restaurant.zonajs.ru/) - демка

## Лицензия

MIT