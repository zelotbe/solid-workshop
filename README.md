# solid-workshop
This is a very basic guided workshop on Solid (decentralized data) with co-students.
We are going to use SolidCommunity as our POD provider.
The goal is for them to understand the basics (read/write) to a Solid Pod.

We are going to make a simple To-Do list.

#### Installation
I've already provided a package.json, all you have to do is install them.
Otherwise we lose precious time.

```bash
npm install
```

## Running our development environment

We use webpack to compile our project and to serve it
I've made a basic script in package.json that runs both.

```bash
npm run dev
```

#### Building

```bash
npm run build
```

The files generated are located in /dist, these can be placed on our hosting (In our case: Plesk).
