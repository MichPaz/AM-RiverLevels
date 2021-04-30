FROM postgres:9.6
RUN localedef -i pt_BR -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8
ENV POSTGRES_USER=amManager
ENV POSTGRES_DB=am_river_db
ENV POSTGRES_PASSWORD=tcc
EXPOSE 5432