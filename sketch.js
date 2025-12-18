const {
  Engine,
  Body,
  Bodies,
  Constraint,
  Composite,
  Composites,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} = Matter;

let engine;
let bodies = [];
let ground;
let num = 15;
let radius = 10;
let length = 25;
let chains, mouse, mouseConstraint;

function setup() {
  noCanvas();
  engine = Engine.create();
  render = Render.create({
    element: document.body,
    engine: engine,
    options: { width: 400, height: 400 },
  });

  for (let i = 0; i < num; i++) {
    let x = 200 + i * 20;
    let y = random(0, 40);

    let fixed;
    if (i === 0) {
      fixed = true;
    } else {
      fixed = false;
    }
    bodies[i] = Bodies.circle(x, y, radius, { isStatic: fixed });
  }

  chains = Composite.create();
  Composite.add(chains, bodies);
  let options = {
    stiffness: 1,
    length: length,
  };
  Composites.chain(chains, 0, 0, 0, 0, options);

  ground = Bodies.rectangle(200, 350, 400, 10, { isStatic: true });

  mouse = Mouse.create(document.body);
  mouseConstraint = MouseConstraint.create(engine, mouse);

  Composite.add(engine.world, [chains, ground, mouseConstraint]);

  Render.run(render);
  runner = Runner.create();
  Runner.run(runner, engine);
}

// mouse = Mouse.create(render.canvas);
// mouseConstraint = MouseConstraint.create(engine, {
//   mouse: mouse,
//   constraint: {
//     stiffness: 0.2,
//   },
// });
