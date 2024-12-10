FROM mongo:8.0.3

# Environment variables for the replica set host/port
ENV MONGO_REPLICA_PORT=27017
ENV MONGO_REPLICA_HOST=localhost

# Environment variables for root user credentials
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=secret

# Run mongod and set up the replica set and root user
CMD mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & \
    MONGOD_PID=$!; \
    # Commands to set up replica set and root user
    INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] })"; \
    INIT_USER_CMD="db.getSiblingDB('admin').getUser('$MONGO_INITDB_ROOT_USERNAME') || db.getSiblingDB('admin').createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: ['root'] })"; \
    # Wait until the replica set is initialized
    until mongosh --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD" 2>&1 | grep -q 'already initialized'; do sleep 1; done; \
    # Ensure the root user is created
    until mongosh --port $MONGO_REPLICA_PORT --eval "$INIT_USER_CMD"; do sleep 1; done; \
    echo "REPLICA SET ONLINE"; \
    # Keep the container running by waiting on the mongod process
    wait $MONGOD_PID;