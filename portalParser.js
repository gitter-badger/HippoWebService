//  enrollment.js
//
//  Written by Buğra Ekuklu, The Digital Warehouse. Copyright 2015.
//  thedigitalwarehouse.com
//
//    @description: Course enrollments

(function() {
    'use strict'

    var Q = require('q');               //  kriskowal's promise implementation

    var nodefiedrequest = require('request');
    var request = function (options) {
        var deferred = Q.defer();

        nodefiedrequest(options, function (error, response, body) {
            if (error) deferred.reject(error);
            else {
                var Response = {};

                Response.response = response;
                Response.body = body;

                deferred.resolve(Response);
            }
        });

        return deferred.promise;
    }

    var DomParser = require('dom-parser');

    var debug = true;

//        getAccountInformation();

    function getAccountInformation(account) {
        var results = [];

        var cookieJar = nodefiedrequest.jar();

        return Q.resolve()

        //  0
        .then(function () {
            var options = {
                method: 'GET',
                url: 'http://ssb.sis.itu.edu.tr:9000/pls/PROD/twbkwbis.P_WWWLogin',
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
                    'Referer': 'http://www.sis.itu.edu.tr/',
                    'Accept-Encoding': 'gzip, deflate, sdch',
                    'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4,de;q=0.2',
                    'Content-Type': 'text/plain'
                },
                followRedirect: false,
                jar: cookieJar,
            }

            return request(options);
        })

        //  1
        .then(function (result) {
            console.log(result.response.statusCode);
            results.push(result);

            if (result.response.statusCode != 302) return Q.reject(Error('Could not connect to server.'));

            var options = {
                method: 'GET',
                url: result.response.headers.location,
                headers: {
                    'Cache-Control': 'private',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
                    'Referer': 'http://www.sis.itu.edu.tr/',
                    'Accept-Encoding': 'gzip, deflate, sdch',
                    'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4,de;q=0.2'
                },
                followRedirect: false,
                jar: cookieJar,
            }

            return request(options);
        })
        .catch(function (error) {
            console.error(error);
        })

        //  2
        .then(function (result) {
            console.log(result.response.statusCode);
            results.push(result);

            if (result.response.statusCode != 302) return Q.reject(Error('Couldn't connect to server.1'));

            var options = {
                method: 'GET',
                url: 'https://giris.itu.edu.tr' + result.response.headers.location,
                headers: {
                    'Connection': 'keep-alive',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
                    'Referer': 'http://www.sis.itu.edu.tr/',
                    'Accept-Encoding': 'gzip, deflate, sdch',
                    'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4,de;q=0.2'
                },
                followRedirect: false,
                jar: cookieJar,
            }

            return request(options);
        })
        .catch(function (error) {
            console.error(error);
        })

        //  3
        .then(function (result) {
            console.log(result.response.statusCode);
            results.push(result);

            if (result.response.statusCode != 200) return Q.reject(Error('Couldn't connect to server.1'));

            //  Get current .NET viewstate

            var parser = new DomParser();

            var dom = parser.parserFromString(result.body);



            var options = {
                method: 'POST',
                url: 'https://giris.itu.edu.tr' + results[1].response.headers.location,
                headers: {
                    'Connection': 'keep-alive',
                    'Cache-Control': 'max-age=0',
                    'Origin': 'https://giris.itu.edu.tr',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
                    'Referer': 'https://giris.itu.edu.tr' + results[1].response.headers.location,
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4,de;q=0.2'
                },
                followRedirect: false,
                jar: cookieJar,
                form: {
                    __EVENTTARGET: '',
                    __EVENTARGUMENT: '',
                    __VIEWSTATE: '',
                    __VIEWSTATEGENERATOR: 'C2EE9ABB',
                    UsernameTbx: account.username,
                    PasswordTbx: account.password,
                    'LoginBtn.x': '79',
                    'LoginBtn.y': '14',
                },
            }

//            return request(options);
        })
        .catch(function (error) {
            console.error(error);
        })

        //  4
        .then(function (result) {
            console.log(result.response.statusCode);
            results.push(result);

            if (result.response.statusCode != 302) return Q.reject(Error('Couldn't connect to server.1'));

            var options = {
                method: 'GET',
                url: 'https://giris.itu.edu.tr' + result.response.headers.location,
                headers: {
                    'Connection': 'keep-alive',
                    'Cache-Control': 'max-age=0',
                    'Origin': 'https://giris.itu.edu.tr',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
                    'Referer': 'https://giris.itu.edu.tr' + results[1].response.headers.location,
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4,de;q=0.2'
                },
                followRedirect: false,
                jar: cookieJar,
            }

            return request(options);
        })
        .catch(function (error) {
            console.error(error);
        })

        //  5
        .then(function (result) {
            console.log(result.response.statusCode);
            results.push(result);

            if (result.response.statusCode != 302) return Q.reject(Error('Couldn't connect to server.1'));

            var options = {
                method: 'GET',
                url: 'https://giris.itu.edu.tr' + result.response.headers.location,
                headers: {
                    'Connection': 'keep-alive',
                    'Cache-Control': 'max-age=0',
                    'Origin': 'https://giris.itu.edu.tr',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
                    'Referer': 'https://giris.itu.edu.tr' + results[1].response.headers.location,
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4,de;q=0.2'
                },
                followRedirect: false,
                jar: cookieJar,
            }

            return request(options);
        })
        .catch(function (error) {
            console.error(error);
        })

        //  6
        .then(function (result) {
            console.log(result.response.statusCode);
            results.push(result);

            if (result.response.statusCode != 302) return Q.reject(Error('Couldn't connect to server.1'));

            var options = {
                method: 'GET',
                url: result.response.headers.location,
                headers: {
                    'Connection': 'keep-alive',
                    'Cache-Control': 'max-age=0',
                    'Origin': 'https://giris.itu.edu.tr',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
                    'Referer': 'https://giris.itu.edu.tr' + results[1].response.headers.location,
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4,de;q=0.2'
                },
                followRedirect: false,
                jar: cookieJar,
            }

            return request(options);
        })
        .catch(function (error) {
            console.error(error);
        })

        //  7   ssb.sis.itu.edu.tr:9000
        .then(function (result) {
            console.log(result.response.statusCode);
            results.push(result);

            if (result.response.statusCode != 302) return Q.reject(Error('Couldn't connect to server.1'));

            var options = {
                method: 'GET',
                url: result.response.headers.location,
                headers: {
                    'Connection': 'keep-alive',
                    'Cache-Control': 'max-age=0',
                    'Origin': 'https://giris.itu.edu.tr',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
                    'Referer': 'https://giris.itu.edu.tr' + results[1].response.headers.location,
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4,de;q=0.2'
                },
                followRedirect: false,
                jar: cookieJar,
            }

            return request(options);
        })
        .catch(function (error) {
            console.error(error);
        })

        //  8   ssb.sis.itu.edu.tr:9000
        .then(function (result) {
            console.log(result.response.statusCode);
            results.push(result);

            if (result.response.statusCode != 302) return Q.reject(Error('Couldn't connect to server.1'));

//            var options = {
//                method: 'POST',
//                url: 'http://ssb.sis.itu.edu.tr:9000/pls/PROD/twbkwbis.P_ValLogin',
//                headers: {
//                    'Connection': 'keep-alive',
//                    'Cache-Control': 'max-age=0',
//                    'Origin': 'https://giris.itu.edu.tr',
//                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//                    'Upgrade-Insecure-Requests': '1',
//                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
//                    'Referer': 'https://giris.itu.edu.tr' + results[1].response.headers.location,
//                    'Accept-Encoding': 'gzip, deflate',
//                    'Accept-Language': 'tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4,de;q=0.2'
//                },
//                followRedirect: false,
//                jar: cookieJar,
//                //  TODO: Link it to the account
//            form: {
//            sid: 150120016,
//            PIN: 150120,
//            SessionId:
//            }
//            }
//
//            return request(options);
        })
        .catch(function (error) {
            console.error(error);
        })

    }

    function debugLog(string) {
        if (debug) {
            return console.log(string);
        } else {
            return;
        }
    }
}());
