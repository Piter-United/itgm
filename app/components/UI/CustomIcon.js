import React from 'react'
import { Icon } from 'antd'

const icons = {
  facebook: () => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 15.0913C30 6.75456 23.2863 0 15 0C6.71371 0 0 6.75456 0 15.0913C0 22.6235 5.48528 28.8669 12.6562 30V19.4538H8.84577V15.0913H12.6562V11.7663C12.6562 7.98438 14.8942 5.89533 18.3218 5.89533C19.9633 5.89533 21.6798 6.18986 21.6798 6.18986V9.90182H19.7879C17.925 9.90182 17.3438 11.0653 17.3438 12.2586V15.0913H21.5038L20.8385 19.4538H17.3438V30C24.5147 28.8669 30 22.6235 30 15.0913Z"
        fill="#2A2A2A"
      />
    </svg>
  ),
  github: () => (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0017 0.263185C6.71322 0.259694 0 7.24858 0 15.8747C0 22.6961 4.19953 28.4945 10.048 30.624C10.8357 30.83 10.715 30.247 10.715 29.849V27.1435C6.16691 27.6986 5.98257 24.5637 5.67758 24.0401C5.06089 22.9439 3.60295 22.6646 4.03866 22.141C5.07429 21.5859 6.13004 22.2806 7.35337 24.1623C8.23819 25.5272 9.96425 25.2968 10.839 25.0699C11.0301 24.2495 11.4389 23.5164 12.002 22.9474C7.28969 22.0677 5.32566 19.0724 5.32566 15.5117C5.32566 13.7836 5.87197 12.1953 6.94448 10.9141C6.26075 8.80206 7.00816 6.99374 7.1087 6.72494C9.05597 6.54341 11.0803 8.17718 11.2379 8.30634C12.3439 7.99565 13.6074 7.83157 15.0218 7.83157C16.4429 7.83157 17.7098 8.00263 18.8258 8.31681C19.2046 8.01659 21.0814 6.61323 22.8913 6.78429C22.9885 7.05309 23.7191 8.81951 23.0756 10.9036C24.1615 12.1883 24.7146 13.7906 24.7146 15.5221C24.7146 19.0899 22.7371 22.0886 18.0114 22.9544C18.4162 23.369 18.7376 23.8635 18.9568 24.4089C19.1761 24.9544 19.2888 25.5398 19.2883 26.1311V30.0585C19.3152 30.3727 19.2883 30.6833 19.7911 30.6833C25.7267 28.5993 30 22.7589 30 15.8782C30 7.24858 23.2834 0.263185 15.0017 0.263185Z"
        fill="#2A2A2A"
      />
    </svg>
  ),
  heart: () => (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.8535 2.07554L17.8531 2.07516C17.3393 1.58329 16.733 1.19184 16.0668 0.922615L16.0662 0.922357C15.3752 0.641985 14.6336 0.498331 13.8847 0.500015L13.8835 0.500017C12.8313 0.500016 11.8063 0.781443 10.9169 1.31141L10.9169 1.31142C10.7041 1.43819 10.5024 1.57715 10.3116 1.7283L10.0011 1.97428L9.69066 1.7283C9.49987 1.57715 9.29819 1.43819 9.08542 1.31142L9.08541 1.31141C8.19597 0.781443 7.17099 0.500016 6.11876 0.500016C5.36026 0.500016 4.62779 0.641725 3.93609 0.922359L3.93556 0.922575C3.26694 1.19295 2.66555 1.58124 2.14908 2.07531L2.14839 2.07596C1.63546 2.56478 1.22637 3.14651 0.943724 3.78787L17.8535 2.07554ZM17.8535 2.07554C18.3658 2.56504 18.775 3.14677 19.0586 3.78787L17.8535 2.07554ZM0.935544 8.04396C1.18105 8.66991 1.53667 9.32824 1.998 10.0009L0.935544 8.04396ZM0.935544 8.04396C0.642739 7.29615 0.5 6.57327 0.5 5.89044C0.5 5.16212 0.649727 4.45516 0.943707 3.78791L0.935544 8.04396ZM5.02056 13.3406L5.02061 13.3406C6.07736 14.2938 7.13098 15.1013 7.93253 15.6777C8.33292 15.9656 8.66941 16.1951 8.91063 16.3555C9.03124 16.4357 9.12788 16.4985 9.19663 16.5427C9.23102 16.5648 9.2583 16.5821 9.27798 16.5944L9.3013 16.609C9.30619 16.6121 9.30869 16.6136 9.30938 16.614L9.30955 16.6141L9.31744 16.6189L9.3174 16.6189L9.8651 16.962C9.86514 16.9621 9.86518 16.9621 9.86522 16.9621C9.94637 17.0126 10.0536 17.0126 10.1348 16.9621C10.1348 16.9621 10.1348 16.9621 10.1349 16.962L10.6826 16.6189L10.6827 16.6189C10.7632 16.5685 12.8603 15.25 14.9794 13.3406C16.2552 12.1902 17.2705 11.066 18.002 10.0009C18.464 9.32727 18.8213 8.66938 19.064 8.04511L19.0644 8.04396C19.3572 7.29615 19.5 6.57327 19.5 5.89044V5.88899C19.5021 5.16165 19.3526 4.45517 19.0586 3.7879L5.02056 13.3406ZM5.02056 13.3406C3.74488 12.1903 2.72963 11.0662 1.99816 10.0011L5.02056 13.3406ZM16.2542 0.459039C15.5029 0.154214 14.6971 -0.001813 13.8835 1.58937e-05C12.7422 1.58937e-05 11.6286 0.305278 10.6609 0.881883C10.4294 1.01982 10.2095 1.17132 10.0011 1.33638C9.79279 1.17132 9.57285 1.01982 9.34135 0.881883L16.2542 0.459039Z"
        stroke="#2A2A2A"
        stroke-opacity="0.7"
      />
    </svg>
  ),
  instagram: () => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.6875 15C19.6875 16.2432 19.1936 17.4355 18.3146 18.3146C17.4355 19.1936 16.2432 19.6875 15 19.6875C13.7568 19.6875 12.5645 19.1936 11.6854 18.3146C10.8064 17.4355 10.3125 16.2432 10.3125 15C10.3125 14.7328 10.3406 14.4719 10.3891 14.2187H8.75V20.4641C8.75 20.8984 9.10156 21.25 9.53594 21.25H20.4656C20.6738 21.2496 20.8733 21.1666 21.0204 21.0193C21.1674 20.8719 21.25 20.6722 21.25 20.4641V14.2187H19.6109C19.6594 14.4719 19.6875 14.7328 19.6875 15ZM15 18.125C15.4105 18.1249 15.8169 18.0439 16.1961 17.8868C16.5753 17.7296 16.9198 17.4993 17.21 17.2089C17.5002 16.9186 17.7304 16.574 17.8874 16.1947C18.0444 15.8154 18.1251 15.4089 18.125 14.9984C18.1249 14.588 18.0439 14.1815 17.8868 13.8023C17.7296 13.4231 17.4993 13.0786 17.2089 12.7884C16.9186 12.4982 16.574 12.2681 16.1947 12.1111C15.8154 11.9541 15.4089 11.8733 14.9984 11.8734C14.1694 11.8736 13.3745 12.2032 12.7884 12.7895C12.2024 13.3759 11.8732 14.171 11.8734 15C11.8736 15.829 12.2032 16.624 12.7895 17.21C13.3759 17.7961 14.171 18.1252 15 18.125ZM18.75 11.7187H20.6234C20.7479 11.7188 20.8673 11.6694 20.9554 11.5816C21.0436 11.4937 21.0933 11.3745 21.0937 11.25V9.37656C21.0937 9.25183 21.0442 9.1322 20.956 9.044C20.8678 8.9558 20.7482 8.90625 20.6234 8.90625H18.75C18.6253 8.90625 18.5056 8.9558 18.4174 9.044C18.3292 9.1322 18.2797 9.25183 18.2797 9.37656V11.25C18.2812 11.5078 18.4922 11.7187 18.75 11.7187ZM15 0C11.0218 0 7.20644 1.58035 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C7.20644 28.4196 11.0218 30 15 30C16.9698 30 18.9204 29.612 20.7403 28.8582C22.5601 28.1044 24.2137 26.9995 25.6066 25.6066C26.9995 24.2137 28.1044 22.5601 28.8582 20.7403C29.612 18.9204 30 16.9698 30 15C30 13.0302 29.612 11.0796 28.8582 9.25975C28.1044 7.43986 26.9995 5.78628 25.6066 4.3934C24.2137 3.00052 22.5601 1.89563 20.7403 1.14181C18.9204 0.387986 16.9698 0 15 0ZM22.8125 21.0766C22.8125 22.0312 22.0312 22.8125 21.0766 22.8125H8.92344C7.96875 22.8125 7.1875 22.0312 7.1875 21.0766V8.92344C7.1875 7.96875 7.96875 7.1875 8.92344 7.1875H21.0766C22.0312 7.1875 22.8125 7.96875 22.8125 8.92344V21.0766Z"
        fill="#2A2A2A"
      />
    </svg>
  ),
  linkedIn: () => (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 0C6.71562 0 0 6.79356 0 15.1741C0 23.5546 6.71562 30.3481 15 30.3481C23.2844 30.3481 30 23.5546 30 15.1741C30 6.79356 23.2844 0 15 0ZM11.3281 21.4634H8.29062V11.575H11.3281V21.4634ZM9.79062 10.361C8.83125 10.361 8.21094 9.67347 8.21094 8.82309C8.21094 7.95532 8.85 7.2883 9.82969 7.2883C10.8094 7.2883 11.4094 7.95532 11.4281 8.82309C11.4281 9.67347 10.8094 10.361 9.79062 10.361ZM22.4219 21.4634H19.3844V15.9834C19.3844 14.7078 18.9437 13.8416 17.8453 13.8416C17.0063 13.8416 16.5078 14.428 16.2875 14.9923C16.2062 15.193 16.1859 15.4776 16.1859 15.7605V21.4618H13.1469V14.7283C13.1469 13.4939 13.1078 12.4617 13.0672 11.5734H15.7062L15.8453 12.947H15.9062C16.3062 12.3021 17.2859 11.3505 18.925 11.3505C20.9234 11.3505 22.4219 12.7051 22.4219 15.6166V21.4634Z"
        fill="#2A2A2A"
      />
    </svg>
  ),
  twitter: () => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 0C6.71652 0 0 6.71652 0 15C0 23.2835 6.71652 30 15 30C23.2835 30 30 23.2835 30 15C30 6.71652 23.2835 0 15 0ZM22.2087 11.3069C22.2187 11.4643 22.2187 11.6283 22.2187 11.7891C22.2187 16.7042 18.4754 22.3661 11.635 22.3661C9.52567 22.3661 7.57031 21.7533 5.92299 20.6987C6.22433 20.7321 6.51228 20.7455 6.82031 20.7455C8.56138 20.7455 10.1618 20.1562 11.4375 19.1585C9.80357 19.125 8.4308 18.0536 7.96205 16.5804C8.5346 16.6641 9.05022 16.6641 9.63951 16.5134C8.79819 16.3425 8.04199 15.8855 7.49938 15.2203C6.95678 14.555 6.66123 13.7223 6.66295 12.8638V12.817C7.15513 13.0949 7.73438 13.2656 8.3404 13.2891C7.83095 12.9495 7.41314 12.4895 7.12403 11.9499C6.83493 11.4102 6.68345 10.8075 6.68304 10.1953C6.68304 9.50223 6.86384 8.86942 7.18862 8.32031C8.12244 9.46988 9.28771 10.4101 10.6087 11.0798C11.9297 11.7495 13.3768 12.1338 14.856 12.2076C14.3304 9.67969 16.2188 7.63393 18.4888 7.63393C19.5603 7.63393 20.5246 8.08259 21.2042 8.8058C22.0446 8.64844 22.8482 8.3337 23.5647 7.91183C23.2868 8.77232 22.7042 9.49888 21.9308 9.95759C22.6808 9.87723 23.404 9.66964 24.0737 9.37835C23.5681 10.1217 22.9353 10.7812 22.2087 11.3069Z"
        fill="#2A2A2A"
      />
    </svg>
  ),
  vk: () => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 0C13.0302 0 11.0796 0.387987 9.25975 1.14181C7.43986 1.89563 5.78628 3.00052 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C5.78628 26.9995 7.43986 28.1044 9.25975 28.8582C11.0796 29.612 13.0302 30 15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 13.0302 29.612 11.0796 28.8582 9.25975C28.1044 7.43986 26.9995 5.78628 25.6066 4.3934C24.2137 3.00052 22.5601 1.89563 20.7403 1.14181C18.9204 0.387987 16.9698 0 15 0ZM5.25 9.75H7.5C8.04 9.75 8.25 9.99 8.46 10.605C9.54 13.755 11.355 16.5 12.105 16.5C12.39 16.5 12.525 16.38 12.525 15.675V12.42C12.435 10.92 11.64 10.785 11.64 10.26C11.64 10.005 11.85 9.75 12.21 9.75H15.675C16.155 9.75 16.305 10.005 16.305 10.56V14.94C16.305 15.405 16.5 15.57 16.65 15.57C16.935 15.57 17.175 15.405 17.685 14.895C19.275 13.11 20.4 10.38 20.4 10.38C20.55 10.05 20.805 9.75 21.36 9.75H23.565C24.24 9.75 24.39 10.095 24.24 10.56C23.955 11.85 21.27 15.645 21.27 15.645C21 16.02 20.94 16.2 21.27 16.635C21.495 16.95 22.275 17.61 22.785 18.225C23.745 19.29 24.45 20.19 24.66 20.805C24.84 21.435 24.525 21.75 23.895 21.75H21.675C20.835 21.75 20.595 21.075 19.095 19.575C17.775 18.315 17.25 18.15 16.89 18.15C16.44 18.15 16.305 18.27 16.305 18.915V20.895C16.305 21.435 16.14 21.75 14.73 21.75C12.39 21.75 9.81 20.325 7.995 17.7C5.25 13.86 4.5 10.965 4.5 10.38C4.5 10.05 4.62 9.75 5.25 9.75Z"
        fill="#2A2A2A"
      />
    </svg>
  ),
  user: () => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 15C30 6.72927 23.2707 0 15 0C6.72927 0 0 6.72927 0 15C0 19.3652 1.87569 23.3002 4.8619 26.0436C4.86555 26.0469 4.8655 26.0527 4.86179 26.056C4.85797 26.0593 4.85804 26.0653 4.86194 26.0686L5.34109 26.4725C5.37273 26.4993 5.40709 26.5211 5.43873 26.5473C5.69727 26.7616 5.96509 26.9651 6.23782 27.162C6.32618 27.2258 6.41455 27.2896 6.50455 27.3518C6.79582 27.5525 7.09473 27.7429 7.40018 27.9235C7.46673 27.9627 7.53382 28.0009 7.60091 28.0391C7.93527 28.2295 8.27673 28.4089 8.62636 28.5736C8.652 28.5856 8.67818 28.5965 8.70382 28.6085C9.84327 29.1382 11.0596 29.5271 12.3316 29.7567C12.3649 29.7627 12.3982 29.7687 12.432 29.7747C12.8269 29.8429 13.2262 29.8975 13.6304 29.934C13.6795 29.9384 13.7285 29.9411 13.7782 29.9455C14.1807 29.9787 14.5876 30 15 30C15.4085 30 15.8116 29.9787 16.212 29.9465C16.2627 29.9422 16.3135 29.9395 16.3642 29.9351C16.7651 29.8985 17.1611 29.8456 17.5522 29.7785C17.586 29.7725 17.6204 29.7665 17.6542 29.76C18.9071 29.5353 20.106 29.1551 21.2307 28.6391C21.2722 28.62 21.3142 28.602 21.3556 28.5824C21.6922 28.4242 22.0211 28.2535 22.3435 28.0718C22.4236 28.0265 22.5033 27.9807 22.5829 27.9338C22.8764 27.7609 23.1649 27.5804 23.4453 27.3884C23.5462 27.3196 23.6449 27.2471 23.7447 27.1751C23.9842 27.0027 24.2193 26.8249 24.4478 26.6389C24.4985 26.598 24.5531 26.5625 24.6027 26.5205L25.0942 26.1102C25.0982 26.1068 25.0982 26.1008 25.0943 26.0974C25.0905 26.0942 25.0904 26.0883 25.0941 26.0849C28.1064 23.3404 30 19.3875 30 15ZM1.09091 15C1.09091 7.33036 7.33036 1.09091 15 1.09091C22.6696 1.09091 28.9091 7.33036 28.9091 15C28.9091 18.9288 27.2702 22.4805 24.6418 25.0118C24.4012 25.2435 24.0356 25.2548 23.7371 25.1051L19.1187 22.7962C18.7042 22.5889 18.4467 22.1722 18.4467 21.7091V20.6547C18.4467 20.2934 18.5739 19.9451 18.7833 19.6505C19.1446 19.1402 19.4628 18.5951 19.7351 18.0205C20.0798 17.2933 20.7262 16.7139 21.1094 16.0062C21.2625 15.7234 21.3475 15.4013 21.3475 15.0622V13.1285C21.3475 13.0294 21.3398 12.931 21.3249 12.8339C21.216 12.1239 20.8636 11.4413 20.8636 10.723V9.29073C20.892 9.00709 20.9924 7.41 19.8365 6.09218C18.8313 4.94455 17.2042 4.36364 15 4.36364C12.7958 4.36364 11.1687 4.94455 10.1635 6.09164C9.00764 7.40945 9.108 9.00764 9.13636 9.29018V10.7239C9.13636 11.4413 8.7849 12.1229 8.67533 12.8319C8.66026 12.9295 8.65255 13.0284 8.65255 13.128V15.0616C8.65255 15.3254 8.70453 15.5814 8.80193 15.8176C9.0459 16.4092 9.45489 16.9403 9.67927 17.5396C9.9334 18.2184 10.2389 18.8008 10.5091 19.2498C10.8461 19.8097 11.0705 20.4389 11.0705 21.0925V21.6638C11.0705 22.1089 10.8278 22.518 10.4367 22.7318L6.12382 25.0844C5.87454 25.2199 5.56237 25.21 5.358 25.0131C2.72924 22.4812 1.09091 18.9286 1.09091 15Z"
        fill="#ABABAB"
      />
    </svg>
  )
}

export default ({ type, ...props }) =>
  icons.hasOwnProperty(type) ? (
    <Icon component={icons[type]} {...props} />
  ) : (
    <Icon type {...props} />
  )
