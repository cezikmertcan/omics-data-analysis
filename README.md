# Omics Data Retrieval and Analysis System

## Description

The Omics Data Retrieval and Analysis System is a platform that enables users to retrieve specific omics data, process it, and visualize the results seamlessly.

## Dependencies

- Docker
- Docker Compose
- Ports 80, 81, 3000, 5000 should be available

## Installation Instructions

1. **Clone the repository:**

***If you have gh installed:***

```bash
gh repo clone cezikmertcan/omics-data-analysis
```
***Or you can go with the usual git clone command***

```bash
git clone https://github.com/cezikmertcan/omics-data-analysis.git
```
```bash
git clone git@github.com:cezikmertcan/omics-data-analysis.git
```

3. **Navigate to the project folder:**

```bash
cd omics-data-analysis
```

4. **Run Docker Compose:**

```bash
docker-compose up
```

## Configuration

No additional configuration is required. docker-compose.yml has all the necessary variables To change ports edit the docker-compose.yml file as you need. But please keep in mind that you also need to change the nginx config files.

## Usage

Once the Docker containers are up and running, access the system through your web browser:

[http://localhost:80](http://localhost:80)

## Docker Setup

The project is containerized using Docker. To build and run the Docker image, follow the installation instructions above.

## Testing

No testing suite is included in this repository.

## Contributing

This repository is private, and contributions are not accepted.

## License

[MIT Licence](https://en.wikipedia.org/wiki/MIT_License). A permissive license that allows users to do almost anything with the code as long as they provide attribution back to the author and don't hold the author liable.

## Contact Information

For any questions or concerns, feel free to reach out through the [GitHub Profile](https://github.com/cezikmertcan/) or by [email](mailto:cezikmertcan@gmail.com).
