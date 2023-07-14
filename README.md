# Budgets

The production app is on it's way to this space. Expected before November 2023. Thank you!
<hr>
(This project was generated with [Angular](https://github.com/angular/angular-cli) version 15)
<hr>
🔴**WARNING**🔴
Migrations are not included in this repository and pipelines were removed and hence a build may not work properly or the built app may not work as expected. This repos is treated as an archive.
<hr>

 - Built with Angular, powered by Google Cloud Firestore, this is an elaborate, **real-time** personal finance tracker application that is designed in a requirement-first, intuitive way.
 - Supports multiple currencies, accounts, custom transactions with user definable rules for each rather than the classical income and expense as the types of transactions and a lot more **need-driven** features.
 - A data-first approach has been followed and the application is, thanks to Cloud Firestore, 100% reactive to remote changes in data.  
 - It has been constructed in such a way that not just the presentation of data, but the UI components will also react and repaint themself based on data changes. Example: Based on the changes in a part of data that controls 'informational cards' in the home page, new cards will be dynamically added, updated or deleted which is achieved through 'dynamic components' strategy in angular.
 - The performance is being given a special attention as the realtime nature will cause repaint way more often. Achieved through ChangeDetectionStrategy which will be replaced soon with the newly introduced 'Signals' based approach.
 - With a lot more in-depth Angular techniques.
 