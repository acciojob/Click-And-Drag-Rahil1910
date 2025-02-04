let draggedCube = null;  // To store the current cube being dragged
let offsetX = 0;         // To store the offset of the mouse from the top-left of the cube
let offsetY = 0;         // To store the offset of the mouse from the top-left of the cube

// Function to handle the "mousedown" event (start dragging)
function startDragging(event) {
  draggedCube = event.target;

  // Get the initial mouse position and the cube's position
  const rect = draggedCube.getBoundingClientRect();
  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;

  // Temporarily remove transition during drag for smoother movement
  draggedCube.style.transition = 'none';

  // Add a class to indicate that dragging is active (for styling)
  draggedCube.classList.add('dragging');

  // Add event listeners for "mousemove" and "mouseup" to handle dragging
  document.addEventListener('mousemove', dragCube);
  document.addEventListener('mouseup', stopDragging);
}

// Function to handle the "mousemove" event (dragging the cube)
function dragCube(event) {
  if (!draggedCube) return;

  // Calculate the new position of the cube based on the mouse position
  const newX = event.clientX - offsetX;
  const newY = event.clientY - offsetY;

  // Get the container's boundaries
  const container = document.querySelector('.container');
  const containerRect = container.getBoundingClientRect();

  // Constrain the cube within the container's boundaries
  const maxX = containerRect.right - containerRect.left - draggedCube.offsetWidth;
  const maxY = containerRect.bottom - containerRect.top - draggedCube.offsetHeight;

  // Set the new position while ensuring it's inside the container
  draggedCube.style.position = 'absolute';  // Make the cube absolutely positioned
  draggedCube.style.left = `${Math.min(Math.max(newX - containerRect.left, 0), maxX)}px`;
  draggedCube.style.top = `${Math.min(Math.max(newY - containerRect.top, 0), maxY)}px`;
}

// Function to handle the "mouseup" event (stop dragging)
function stopDragging(event) {
  if (!draggedCube) return;

  // Re-enable transition after drag to smoothly return the cube if necessary
  draggedCube.style.transition = 'transform 0.1s ease';
  
  // Remove the "dragging" class to indicate that dragging has stopped
  draggedCube.classList.remove('dragging');

  // Reset the dragged cube to null and remove event listeners
  draggedCube = null;
  document.removeEventListener('mousemove', dragCube);
  document.removeEventListener('mouseup', stopDragging);
}

// Attach the "mousedown" event to each cube to initiate dragging
const cubes = document.querySelectorAll('.cube');
cubes.forEach(cube => {
  cube.addEventListener('mousedown', startDragging);
});
