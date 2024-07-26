FROM node:latest

# Install asdf and its plugins
RUN apt-get update && apt-get install -y curl && bash
RUN curl -fsSL https://install.asdf.sh | bash
RUN bash -c 'source ~/.bashrc && asdf plugin-add postgres'

# Install the PostgreSQL version you want
RUN bash -c 'source ~/.bashrc && asdf install postgres 16.3'

# Add any other necessary tools or dependencies