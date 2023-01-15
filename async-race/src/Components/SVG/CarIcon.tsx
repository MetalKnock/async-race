import React from 'react';

interface CarIconProps {
  className: string;
  color: string;
}

function CarIcon({ className, color }: CarIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="#000"
      stroke="#000"
      transform="scale(-1 1)"
      version="1.1"
      viewBox="0 0 512 512"
    >
      <g>
        <g transform="translate(0 -540.362)">
          <path
            fill={color}
            fillOpacity="1"
            stroke="none"
            d="M288.25 152.25c-.832 1.213-1.739 1.72-2.813 2.094-3.49 1.217-6.693 1.778-10.78 2.281-6.248.768-12.975 2.037-19.126 3.375-7.867 1.711-15.588 4.027-23.25 6.5a266.527 266.527 0 00-20.531 7.563c-6.406 2.665-12.693 5.662-18.875 8.812a261.794 261.794 0 00-15.5 8.594 281.371 281.371 0 00-15.313 9.844c-5.716 3.942-11.243 8.112-16.75 12.343-3.192 2.453-6.413 4.905-9.437 7.563-2.041 1.794-1.845 2.079-4.5 3.875-2.035 1.376-4.52 1.18-6.813.094-2.291-1.087-6.093-3.344-6.093-3.344s4.564-3.412 8.156-5.906c-.066.01-.158.054-.219.062-2.283.315-5.22-.536-7.5-.875a21.002 21.002 0 00-4.219-.188c-3.038.17-6.014.877-9 1.47-14.71 2.917-29.412 6.059-43.812 10.25-10.374 3.018-20.642 6.48-30.594 10.687-3.31 1.398-6.664 2.808-9.625 4.844-2.73 1.876-5.281 4.094-7.343 6.687-1.948 2.448-3.292 5.358-4.626 8.188-1.244 2.64-2.548 5.294-3.124 8.156-.898 4.453-.465 9.082-.438 13.625.03 4.894.176 9.816.656 14.687.493 4.995 1.22 9.33 1.438 14.344.045 1.05.027 2.762-.406 3.719-.327.72-.396.868-.625 1.625-.207.682.126 1.438.406 2.094.67 1.568 1.731 2.981 2.937 4.187.603.603 1.475.883 2.094 1.469.903.855 1.428 2.063 2.313 2.937 1.878 1.857 3.937 3.595 6.28 4.813 3.315 1.72 7.045 2.554 10.688 3.375 3.923.884 7.961 1.326 11.969 1.656 2.786.23 5.151.53 8.375.219 2.305-.044 1.94-.023 4.031-.063a47.5 47.5 0 01-2.656-15.656c0-26.207 21.262-47.438 47.469-47.438 26.206 0 47.437 21.231 47.437 47.438 0 4.827-.723 9.487-2.062 13.875 1.499-.026 1.21-.004 2.812-.031 104.131-1.268 157.897-3.013 236.844-4.188 1.387-.02 2.726-.065 4.094-.094a47.519 47.519 0 01-1.25-10.812c0-26.207 21.23-47.438 47.437-47.438 26.207 0 47.469 21.231 47.469 47.438 0 1.638-.088 3.249-.25 4.844a16.928 16.928 0 004.125-1.281c2.753-1.248 5.225-3.115 7.563-5.032 2.52-2.067 4.803-4.414 6.906-6.906 1.325-1.57 3.019-3.05 3.562-5.031.686-2.501-.49-1.931-.625-7.781-.211-9.222.009-18.454-.625-27.657-.251-3.648-.323-7.802-1.25-10.906-.325-1.09-1.367-2.156-2.094-3.031-.669-.807-1.983-.958-2.093-2-.419-3.963-.464-8.104-.656-12.156-.125-2.616.025-5.239-.188-7.844-.026.175-.072.36-.125.531-.265.854-1.238 1.303-1.656 2.094-.445.84-.685 1.782-.844 2.719-.31 1.826-.301 3.711-.219 5.562.086 1.935.6 3.82.75 5.75.095 1.22.591 2.57.094 3.688-.373.837-1.246 1.431-2.094 1.78-1.652.682-3.57.63-5.344.407-1.83-.23-3.667-.833-5.25-1.781-3.116-1.867-5.414-4.854-7.968-7.438-4.19-4.238-8.435-8.467-12.031-13.219-.919-1.213-2.147-2.375-2.407-3.875-.226-1.302.048-2.796.813-3.875 1.47-2.071 4.209-2.87 6.5-3.968 2.71-1.299 5.567-2.406 8.5-3.063 2.123-.475 4.324-.61 6.5-.625 2.103-.014 4.258-.045 6.281.531 1.848.527 3.764 1.269 5.125 2.625.18.18.352.388.5.594-1.344-3.192-3.358-6.003-5.344-8.844-.384-.14-4.759-1.763-7.187-2.343-1.754-.42-5.031-.406-5.031-.406s-4.24-6.146-6.594-9.032c-2.86-3.507-5.884-6.873-9.125-10.031-3.53-3.44-7.275-6.7-11.219-9.656-3.9-2.923-12.25-7.969-12.25-7.969l6.875-3.406c-1.023-1.131.384-4.064-.688-5.375-.812-.995-2.172-.995-3.875-1.031-4.61-.1-8.93-.349-13.53-.657-5.897-.394-11.735-1.321-17.594-2.094-5.81-.765-11.583-1.892-17.407-2.53-12.048-1.323-24.144-2.138-36.25-2.72-13.261-.637-26.574-.423-39.844-.843a719.515 719.515 0 01-14.875-.625c-4.403-.23-8.78-.949-13.187-.844zm34.563 11.844s9.71.014 14.562.219c6.997.295 13.993.848 20.969 1.468 7.139.635 14.279 1.304 21.375 2.313 5.162.734 10.536 1.65 15.406 2.719 1.167.256 2.8.993 2.844 2.187.275 7.346.32 14.338.406 21.5.092 7.65.094 22.938.094 22.938s-25.917.206-38.875.437c-14.08.25-42.219 1.031-42.219 1.031l5.438-54.812zm-22.844.125s-3.334 18.496-5.438 27.656c-2.215 9.645-7.562 28.719-7.562 28.719s-15.507.663-23.25 1.25c-14.349 1.087-28.671 2.562-42.969 4.187-5.39.613-15.313 1.375-15.313 1.375s.05-3.932-.5-5.781c-.552-1.857-2.718-5.125-2.718-5.125l8.25-33.219s9.283-4.035 14.062-5.656c7.416-2.515 15.007-4.47 22.625-6.281 7.692-1.828 15.463-3.453 23.281-4.625 6.112-.916 12.277-1.386 18.438-1.875 3.697-.294 11.094-.625 11.094-.625zM410.53 174.78s6.792 1.645 10.063 2.844c4.579 1.678 9.104 3.599 13.312 6.063 5.264 3.081 10.196 6.79 14.781 10.812 3.12 2.737 6.393 5.481 8.594 9 1.948 3.112.95 2.972-1.906 4.313-5.946 2.79-12.568 3.867-18.969 5.343-6.122 1.413-18.531 3.344-18.531 3.344l-7.344-41.719zm-204.875 10.594c-2.221 9.086-5.415 18.888-7.656 27.969 0 0-3.456-.796-5.125-.625-1.433.146-4.058 1.004-5.969 2-1.667.869-3.672 2.15-5.125 3.344-1.566 1.285-3.362 3.579-4.094 5.468-1.061 2.744 0 7.938 0 7.938s-4.15.376-6.812.656c-2.648.279-7.969.625-7.969.625s2.584-10.74 4.406-15.938c1.233-3.514 4.407-10.28 4.407-10.28s3.893-3.795 6.062-5.438c4.156-3.148 8.68-5.809 13.219-8.375 4.76-2.692 14.656-7.344 14.656-7.344zM70.281 235.438c.742-.02 1.462.065 2.094.437.62.365 1.088 1.19 1.031 1.906-.098 1.24-1.438 2.053-2.312 2.938-2.9 2.933-6.396 5.184-9.625 7.75-4.52 3.59-8.847 7.449-13.625 10.687-2.073 1.405-4.17 2.835-6.5 3.75-2.067.812-4.303 1.148-6.5 1.469-4.088.596-8.213.9-12.344.844-1.474-.02-3.165.387-4.406-.406-.818-.523-.851-1.783-1.469-2.532-.945-1.145-2.175-2.063-3.375-2.937-.658-.48-1.953-.448-2.094-1.25-.42-2.397 2.956-3.887 4.625-5.656 1.561-1.655 2.912-3.77 5.031-4.594.977-.38 2.106.24 3.125 0 2.585-.61 4.682-2.522 7.125-3.563 3.07-1.307 6.27-2.33 9.438-3.375 3.19-1.052 6.386-2.17 9.656-2.937 2.896-.68 5.83-1.1 8.782-1.469a92.17 92.17 0 017.562-.625c1.222-.05 2.545-.406 3.781-.438zM436.406 275.5c-22.917 0-41.5 18.583-41.5 41.5s18.583 41.5 41.5 41.5c22.918 0 41.5-18.583 41.5-41.5s-18.582-41.5-41.5-41.5zm-335.312 1.25c-22.918 0-41.5 18.583-41.5 41.5s18.582 41.5 41.5 41.5c22.917 0 41.469-18.583 41.469-41.5s-18.552-41.5-41.47-41.5zm335.312 10.063c16.668 0 30.188 13.519 30.188 30.187s-13.52 30.188-30.188 30.188S406.25 333.668 406.25 317s13.488-30.188 30.156-30.188zm-335.312 1.25c16.668 0 30.156 13.519 30.156 30.187s-13.488 30.188-30.156 30.188-30.188-13.52-30.188-30.188 13.52-30.188 30.188-30.188z"
            transform="translate(0 540.362)"
          />
        </g>
      </g>
    </svg>
  );
}

export default CarIcon;
